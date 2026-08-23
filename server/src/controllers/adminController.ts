import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import {
  authenticateAdmin,
  buildSessionCookie,
  clearSessionCookie,
  readAdminSession,
} from "../lib/adminAuth.js";
import { logger } from "../utils/logger.js";

const loginSchema = z.object({
  phone: z.string().trim().min(10, "Enter your mobile number."),
  password: z.string().trim().min(4, "Enter your access code."),
});

export async function handleAdminLogin(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid login details.",
    });
  }

  try {
    const token = authenticateAdmin(parsed.data.phone, parsed.data.password);

    if (!token) {
      logger.warn("Admin login failed");
      return res.status(401).json({ ok: false, message: "Invalid credentials." });
    }

    res.setHeader("Set-Cookie", buildSessionCookie(token));
    return res.json({ ok: true, token });
  } catch (error) {
    logger.error("Admin login misconfigured", {
      error: error instanceof Error ? error.message : String(error),
    });
    return res.status(500).json({
      ok: false,
      message: "Admin login is not configured on this server.",
    });
  }
}

export async function handleAdminLogout(_req: Request, res: Response) {
  res.setHeader("Set-Cookie", clearSessionCookie());
  return res.json({ ok: true });
}

export async function handleAdminMe(req: Request, res: Response) {
  const session = readAdminSession(req);

  if (!session) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  return res.json({
    ok: true,
    admin: {
      phone: session.phone,
    },
  });
}

export async function handleAdminInquiries(req: Request, res: Response) {
  const session = readAdminSession(req);
  if (!session) {
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  const limit = clampInt(req.query.limit, 100, 1, 500);
  const skip = clampInt(req.query.skip, 0, 0, 10000);

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { addDate: "desc" },
    take: limit,
    skip,
  });

  return res.json({
    ok: true,
    inquiries,
    meta: {
      limit,
      skip,
      hasMore: inquiries.length === limit,
    },
  });
}

function clampInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === "string" ? Number.parseInt(value, 10) : Number.NaN;
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

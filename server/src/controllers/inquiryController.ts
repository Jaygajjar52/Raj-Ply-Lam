import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { formatZodErrors, inquirySchema } from "../lib/validation.js";
import { logger } from "../utils/logger.js";
import { getRequestMeta } from "../utils/requestMeta.js";

export async function handleCreateInquiry(req: Request, res: Response): Promise<Response> {
  const parsed = inquirySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: parsed.error.issues[0]?.message || "Invalid submission.",
      errors: formatZodErrors(parsed.error),
    });
  }

  const data = parsed.data;
  const meta = getRequestMeta(req);

  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        product: data.product || null,
        category: data.category || null,
        quantity: data.quantity || null,
        city: data.city || null,
        message: data.message,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
        source: data.source || "website",
      },
    });

    logger.info("Inquiry saved", { id: inquiry.id });

    return res.status(201).json({
      ok: true,
      message: "Thank you for contacting Raj Ply Lam. Your inquiry has been received.",
      id: inquiry.id,
      createdAt: inquiry.addDate,
    });
  } catch (error) {
    logger.error("Inquiry save failed", {
      error: error instanceof Error ? error.message : String(error),
    });

    return res.status(500).json({
      ok: false,
      message: "Something went wrong on our end. Please call us directly at +91 9427049594.",
    });
  }
}

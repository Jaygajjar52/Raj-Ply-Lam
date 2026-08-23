import crypto from "node:crypto";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

const COOKIE_NAME = "rajplylam_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function isAdminConfigured() {
  return Boolean(getAdminPhone() && getAdminPassword() && getSessionSecret());
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function authenticateAdmin(phone: string, password: string) {
  if (!isAdminConfigured()) {
    throw new Error("Admin login is not configured.");
  }

  if (normalizePhone(phone) !== getAdminPhone() || password !== getAdminPassword()) {
    return null;
  }

  const now = Date.now();
  const payload = {
    phone: getAdminPhone(),
    iat: now,
    exp: now + SESSION_TTL_MS,
  };

  return signPayload(payload);
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token || !isAdminConfigured()) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signValue(encoded);
  if (!timingSafeEqual(signature, expected)) return null;

  try {
    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      phone?: string;
      iat?: number;
      exp?: number;
    };

    if (!decoded.phone || decoded.phone !== getAdminPhone()) return null;
    if (!decoded.exp || decoded.exp < Date.now()) return null;

    return decoded;
  } catch {
    return null;
  }
}

export function readAdminSession(req: Request) {
  const token = readBearerToken(req.headers.authorization) || readCookie(req.headers.cookie || "", COOKIE_NAME);
  return verifyAdminToken(token);
}

export function buildSessionCookie(token: string) {
  const sameSite = getCookieSameSite();
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${SESSION_TTL_MS / 1000}`,
    `SameSite=${sameSite}`,
  ];

  if (process.env.NODE_ENV === "production" || sameSite === "None") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function clearSessionCookie() {
  const sameSite = getCookieSameSite();
  const parts = [
    `${COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "Max-Age=0",
    `SameSite=${sameSite}`,
  ];

  if (process.env.NODE_ENV === "production" || sameSite === "None") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = readAdminSession(req);

  if (!session) {
    logger.warn("Admin access denied");
    return res.status(401).json({ ok: false, message: "Unauthorized." });
  }

  (req as Request & { adminSession?: { phone: string; iat: number; exp: number } }).adminSession =
    session as { phone: string; iat: number; exp: number };

  return next();
}

function signPayload(payload: { phone: string; iat: number; exp: number }) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signValue(encoded)}`;
}

function signValue(value: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function timingSafeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function readCookie(cookieHeader: string, name: string) {
  const entry = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

function readBearerToken(authorizationHeader: string | undefined) {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;
  return authorizationHeader.slice("Bearer ".length).trim() || null;
}

function getAdminPhone() {
  return normalizePhone(process.env.ADMIN_PHONE || "");
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function getCookieSameSite() {
  const configured = process.env.ADMIN_COOKIE_SAMESITE;

  if (configured === "Strict" || configured === "Lax" || configured === "None") {
    if (configured === "None" && process.env.NODE_ENV !== "production") {
      logger.warn("ADMIN_COOKIE_SAMESITE=None requires HTTPS; using Lax outside production.");
      return "Lax";
    }

    return configured;
  }

  return process.env.NODE_ENV === "production" ? "None" : "Lax";
}

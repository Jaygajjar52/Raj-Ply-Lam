import { Request } from "express";

export function getRequestMeta(req: Request) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ipAddress = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0]?.trim() || req.ip || req.socket.remoteAddress || null;

  return {
    ipAddress,
    userAgent: req.get("user-agent") || null,
  };
}
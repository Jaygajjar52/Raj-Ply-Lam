import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { inquiryRouter } from "./routes/inquiry.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = getAllowedOrigins();

validateProductionEnv();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "50kb" }));

// Basic abuse protection on the public inquiry form.
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many requests. Please try again later." },
});

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "raj-ply-lam-api" }));
app.use("/api/inquiry", inquiryLimiter, inquiryRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not found." });
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      ok: false,
      message: "This website origin is not allowed to access the API. Check CLIENT_ORIGIN on the backend.",
    });
  }

  return res.status(500).json({ ok: false, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Raj Ply Lam API running on http://localhost:${PORT}`);
});

function getAllowedOrigins() {
  return (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
}

function normalizeOrigin(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
}

function validateProductionEnv() {
  if (process.env.NODE_ENV !== "production") return;

  const required = ["DATABASE_URL", "ADMIN_PHONE", "ADMIN_PASSWORD", "ADMIN_SESSION_SECRET", "CLIENT_ORIGIN"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }
}

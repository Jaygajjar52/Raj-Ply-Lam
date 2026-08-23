import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { inquiryRouter } from "./routes/inquiry.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

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

app.listen(PORT, () => {
  console.log(`Raj Ply Lam API running on http://localhost:${PORT}`);
});

import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(3, "Please enter at least 3 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z
    .union([z.string().trim().email("Enter a valid email address."), z.literal("")])
    .optional(),
  product: z.string().optional(),
  message: z.string().trim().min(5, "Please tell us a little about your requirement."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function submitInquiry(data: InquiryInput) {
  const res = await fetch(`${API_BASE}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.message || "Something went wrong. Please try again.");
  }

  return json;
}

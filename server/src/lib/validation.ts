import { ZodError, z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().trim().min(3, "Name must be at least 3 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z
    .union([z.string().trim().email("Enter a valid email address."), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  product: z.string().trim().optional(),
  category: z.string().trim().optional(),
  quantity: z.string().trim().optional(),
  city: z.string().trim().optional(),
  source: z.string().trim().optional(),
  message: z.string().trim().min(5, "Message must be at least 5 characters."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function formatZodErrors(error: ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const field = issue.path.join(".");
    if (field && !acc[field]) {
      acc[field] = issue.message;
    }
    return acc;
  }, {});
}

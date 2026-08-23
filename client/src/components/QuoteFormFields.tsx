import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inquirySchema, InquiryInput, submitInquiry } from "@/lib/api";
import { PRODUCTS } from "@/lib/site-data";

export function QuoteFormFields({
  defaultProduct,
  onSuccess,
  compact = false,
}: {
  defaultProduct?: string | null;
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      product: defaultProduct ?? "",
      message: "",
    },
  });

  useEffect(() => {
    if (defaultProduct) setValue("product", defaultProduct);
  }, [defaultProduct, setValue]);

  const onSubmit = async (data: InquiryInput) => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      await submitInquiry(data);
      setStatus("success");
      reset();
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-10"
      >
        <CheckCircle2 size={52} className="text-gold mb-4" />
        <h3 className="font-display text-2xl text-cream font-semibold">Thank you!</h3>
        <p className="mt-3 text-beige/75 max-w-sm">
          Thank you for contacting Raj Ply Lam. Our team will contact you shortly.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Submit Another Enquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wide text-beige/60 mb-1.5">
          Full Name <span className="text-gold">*</span>
        </label>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Your full name"
          className="w-full rounded-lg bg-cream/5 border border-gold/20 px-4 py-3 text-cream placeholder:text-beige/30 focus:border-gold outline-none transition-colors"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
      </div>

      <div className={compact ? "" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <label className="block text-xs uppercase tracking-wide text-beige/60 mb-1.5">
            Mobile Number <span className="text-gold">*</span>
          </label>
          <div className="flex items-center rounded-lg bg-cream/5 border border-gold/20 focus-within:border-gold transition-colors">
            <span className="px-3 text-beige/50 text-sm border-r border-gold/20">+91</span>
            <input
              {...register("phone")}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              className="w-full bg-transparent px-3 py-3 text-cream placeholder:text-beige/30 outline-none"
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-beige/60 mb-1.5">
            Email (Optional)
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg bg-cream/5 border border-gold/20 px-4 py-3 text-cream placeholder:text-beige/30 focus:border-gold outline-none transition-colors"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-beige/60 mb-1.5">
          Product (Optional)
        </label>
        <select
          {...register("product")}
          className="w-full rounded-lg bg-cream/5 border border-gold/20 px-4 py-3 text-cream outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="" className="bg-wood-light">Select a product</option>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.name} className="bg-wood-light">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-beige/60 mb-1.5">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your requirement..."
          className="w-full rounded-lg bg-cream/5 border border-gold/20 px-4 py-3 text-cream placeholder:text-beige/30 focus:border-gold outline-none transition-colors resize-none"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            Submit Enquiry <Send size={16} />
          </>
        )}
      </Button>
    </form>
  );
}

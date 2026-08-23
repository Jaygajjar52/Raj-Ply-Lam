import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mb-12 md:mb-16", align === "center" ? "text-center mx-auto max-w-2xl" : "text-left")}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-beige/70 text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

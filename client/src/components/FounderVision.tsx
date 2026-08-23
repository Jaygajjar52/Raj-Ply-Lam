import { motion } from "framer-motion";
import { Container } from "@/components/ui/Section";
import { COMPANY } from "@/lib/site-data";
import LogoRajPlyLam from "@/Images/Logo Raj Ply Lam.jpeg";

export function FounderVision() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-grain-fade pointer-events-none" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] glass-card">
              <img
                src={LogoRajPlyLam}
                alt={`${COMPANY.owner}, Founder of Raj Ply Lam`}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood/70 to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 glass-card rounded-xl px-5 py-4 shadow-glass">
              <p className="font-display text-lg text-cream">{COMPANY.owner}</p>
              <p className="text-xs text-beige/60 tracking-wide">Founder, Raj Ply Lam</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8 md:p-12"
          >
            <p className="eyebrow mb-4">Founder's Vision</p>
            <blockquote className="font-display text-xl md:text-3xl leading-relaxed text-cream">
              "For more than 29 years, our goal has been simple—to provide genuine products, fair
              pricing, and service that customers remember. Every project deserves the finest
              materials."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-2xl text-gold-gradient italic">Naresh Gajjar</span>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

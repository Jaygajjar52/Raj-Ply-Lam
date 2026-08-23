import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { ABOUT_SERVICES } from "@/lib/site-data";

export function AboutUs() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-wood-light/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-4">About Us</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream leading-tight">
              Crafting Trust in Every Plank, <span className="text-gold-gradient">Since 1998.</span>
            </h2>
            <p className="mt-6 text-beige/70 leading-relaxed text-base md:text-lg">
              Raj Ply Lam started as a small timber business and has become one of Gujarat's most
              trusted suppliers of plywood, laminates, MDF, and interior materials.
            </p>
            <p className="mt-4 font-display italic text-gold-light text-lg">
              Three generations of craftsmanship. One commitment—quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {ABOUT_SERVICES.map((item) => (
              <div
                key={item}
                className="glass-card rounded-xl p-5 flex items-center gap-3 hover:border-gold/40 transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check size={16} className="text-gold" />
                </span>
                <span className="text-sm md:text-base text-beige/90 font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

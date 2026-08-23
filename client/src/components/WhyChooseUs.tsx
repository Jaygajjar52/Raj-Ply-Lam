import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { WHY_CHOOSE_US } from "@/lib/site-data";

export function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Why Raj Ply Lam" title="The Trusted Choice for Every Project" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CHOOSE_US.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-gold/50 transition-colors"
            >
              <BadgeCheck size={26} className="text-gold shrink-0" />
              <span className="font-display text-base md:text-lg text-cream">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

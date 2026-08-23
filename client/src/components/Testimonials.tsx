import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-wood-light/30">
      <Container>
        <SectionHeading
          eyebrow="Customer Love"
          title="What Our Customers Say"
          subtitle="5000+ happy customers across Ahmedabad and Gujarat trust us with their projects."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass-card rounded-2xl p-7 flex flex-col"
            >
              <Quote size={26} className="text-gold/50 mb-4" />
              <p className="text-beige/85 text-sm md:text-base leading-relaxed flex-1">"{t.text}"</p>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-display text-cream font-medium">{t.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

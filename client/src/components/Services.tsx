import { motion } from "framer-motion";
import { ClipboardList, Package, Truck, SwatchBook, PencilRuler,ShieldCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { SERVICES } from "@/lib/site-data";

const ICONS = [ClipboardList, Package, Truck, SwatchBook, PencilRuler, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Built Around Your Project"
          subtitle="From first consultation to final delivery, we make sourcing materials effortless."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-card rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-gold transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient mb-5">
                  <Icon size={20} className="text-wood" />
                </span>
                <h3 className="font-display text-xl font-semibold text-cream">{service.title}</h3>
                <p className="mt-2 text-sm text-beige/65 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

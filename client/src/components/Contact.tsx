import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { COMPANY } from "@/lib/site-data";

const CARDS = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: [COMPANY.address.line1, COMPANY.address.line2, COMPANY.address.city],
  },
  { icon: Phone, label: "Call Us", lines: [COMPANY.phone] },
  { icon: Mail, label: "Email Us", lines: [COMPANY.email] },
  {
    icon: Clock,
    label: "Business Hours",
    lines: COMPANY.hours.map((h) => `${h.days}: ${h.time}`),
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-wood-light/30">
      <Container>
        <SectionHeading eyebrow="Reach Us" title="We'd Love to Hear From You" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient mb-4">
                <card.icon size={18} className="text-wood" />
              </span>
              <p className="font-display text-cream font-semibold mb-2">{card.label}</p>
              {card.lines.map((line) => (
                <p key={line} className="text-sm text-beige/65 leading-relaxed">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/Section";
import { QuoteFormFields } from "@/components/QuoteFormFields";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { Phone, MessageCircle } from "lucide-react";
import { COMPANY, WHATSAPP_MESSAGE } from "@/lib/site-data";

export function QuoteFormSection() {
  const { prefillProduct } = useQuoteForm();

  return (
    <section id="quote" className="relative py-24 md:py-32 bg-wood-light/30">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Request a Free Quote"
          subtitle="Tell us what you need and our team will get back to you shortly — usually within a few hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-card rounded-2xl p-6 md:p-10"
          >
            <QuoteFormFields defaultProduct={prefillProduct} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-gold/50 transition-colors"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                <Phone size={20} className="text-wood" />
              </span>
              <div>
                <p className="text-xs text-beige/60 uppercase tracking-wide">Call Us</p>
                <p className="font-display text-lg text-cream">{COMPANY.phone}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-gold/50 transition-colors"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient shrink-0">
                <MessageCircle size={20} className="text-wood" />
              </span>
              <div>
                <p className="text-xs text-beige/60 uppercase tracking-wide">WhatsApp</p>
                <p className="font-display text-lg text-cream">Chat with us</p>
              </div>
            </a>

            <div className="glass-card rounded-2xl p-6 flex-1">
              <p className="text-xs text-beige/60 uppercase tracking-wide mb-3">Business Hours</p>
              {COMPANY.hours.map((h) => (
                <div key={h.days} className="flex justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-beige/70">{h.days}</span>
                  <span className="text-cream font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

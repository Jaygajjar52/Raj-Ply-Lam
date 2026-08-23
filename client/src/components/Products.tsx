import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PRODUCTS } from "@/lib/site-data";
import { useQuoteForm } from "@/hooks/useQuoteForm";

export function Products() {
  const { openQuoteForm } = useQuoteForm();

  return (
    <section id="products" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our Range"
          title="Everything Your Project Needs"
          subtitle="From structural timber to the finest laminates — sourced, stocked, and delivered with care."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/10 to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-semibold text-cream">{product.name}</h3>
                <p className="mt-2 text-sm text-beige/65 leading-relaxed flex-1">{product.description}</p>
                <button
                  onClick={() => openQuoteForm(product.name)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all"
                >
                  Enquire <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

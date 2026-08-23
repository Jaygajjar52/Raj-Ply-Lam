import { motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { COMPANY } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

export function GoogleMap() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            <iframe
              title="Raj Ply Lam Location"
              src={COMPANY.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg text-cream">Visit Our Store</p>
              <p className="text-sm text-beige/65 mt-1">
                {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}
              </p>
            </div>
            <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Navigation size={16} /> Get Directions
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { useQuoteForm } from "@/hooks/useQuoteForm";

export function Hero() {
  const { openQuoteForm } = useQuoteForm();

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-wood-gradient opacity-90" />
      <div className="absolute inset-0 bg-grain-fade" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8"
        >
          <ShieldCheck size={16} className="text-gold" />
          <span className="text-xs md:text-sm tracking-wide text-beige/90">Since 1998 · Trusted in Ahmedabad</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-display max-w-3xl text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] text-cream"
        >
          Quality Plywood <span className="text-gold-gradient">Designer Laminates.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="mt-6 max-w-xl text-base md:text-xl text-beige/75 leading-relaxed"
        >
          Ahmedabad's premier supplier of plywood, timber, laminates, MDF, and hardware since 1998.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" onClick={() => openQuoteForm()}>
            Get Quote <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToProducts}>
            Explore Products
          </Button>
        </motion.div>
      </Container>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-beige/50 text-xs tracking-widest"
      >
        SCROLL
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/site-data";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    }
    requestAnimationFrame(tick);
    return () => {
      start = 0;
    };
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="relative py-16 md:py-20 border-y border-gold/10 bg-wood-light/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-display text-3xl md:text-5xl font-bold text-gold-gradient">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs md:text-sm text-beige/70 tracking-wide uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

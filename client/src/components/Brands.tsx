import { Container } from "@/components/ui/Section";
import { BRANDS } from "@/lib/site-data";

export function Brands() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <Container>
        <p className="eyebrow text-center mb-8">
          Trusted Brand Partners
        </p>
      </Container>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-8 py-6">
          {items.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="group flex flex-col items-center"
            >
              {/* Brand Card */}
              <div className="flex h-40 w-80 items-center justify-center rounded-2xl border border-[#8b6b2e]/30 bg-[#2b2018] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#d4af37] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-28 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Brand Name Below Card */}
              <div className="mt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
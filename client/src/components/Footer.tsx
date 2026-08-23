import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { COMPANY, NAV_LINKS, PRODUCTS } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/10 bg-wood pb-24 pt-16 md:pb-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-xl font-bold text-cream">
              Raj <span className="text-gold-gradient">Ply Lam</span>
            </p>
            <p className="mt-3 text-sm text-beige/60 leading-relaxed">{COMPANY.tagline}</p>
            <p className="mt-4 text-xs text-beige/40">
              Ahmedabad's trusted plywood, timber &amp; laminate supplier since {COMPANY.since}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-4 tracking-wide">Quick Links</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-beige/60 hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-4 tracking-wide">Products</p>
            <ul className="space-y-2.5">
              {PRODUCTS.slice(0, 5).map((p) => (
                <li key={p.id} className="text-sm text-beige/60">
                  {p.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-4 tracking-wide">Contact</p>
            <ul className="space-y-3 text-sm text-beige/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-gold transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition-colors">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-beige/40">
            © {year} Raj Ply Lam. All rights reserved. Owned by {COMPANY.owner}.
          </p>
          <p className="text-xs text-beige/30">Quality Plywood Designer Laminates.</p>
        </div>
      </Container>
    </footer>
  );
}

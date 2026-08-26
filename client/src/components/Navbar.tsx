import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { NAV_LINKS, COMPANY } from "@/lib/site-data";
import { useQuoteForm } from "@/hooks/useQuoteForm";

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openQuoteForm } = useQuoteForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(targetId);
    if (!el) return;

    const header = document.querySelector("header");
    const headerOffset = (header?.getBoundingClientRect().height ?? 72) + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleNavClick = (href: string, fromMobile = false) => {
    if (fromMobile) {
      setMobileOpen(false);
      window.setTimeout(() => scrollToSection(href), 275);
      return;
    }

    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav border-b border-gold/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="font-display text-xl md:text-2xl font-bold text-cream"
        >
          Raj <span className="text-gold-gradient">Ply Lam</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-beige/80 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={() => navigate("/admin")}>
            <LockKeyhole size={15} />
            Admin Login
          </Button>
          <Button size="sm" onClick={() => openQuoteForm()}>
            Get Quote
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-cream"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-nav border-t border-gold/10 overflow-hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, true);
                  }}
                  className="py-3 text-beige/85 border-b border-white/5 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/admin");
                }}
              >
                <LockKeyhole size={16} />
                Admin Login
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openQuoteForm();
                }}
              >
                Get Quote
              </Button>
              <a href={`tel:${COMPANY.phoneRaw}`} className="mt-3 text-center text-sm text-beige/60">
                or call {COMPANY.phone}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

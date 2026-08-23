import { MessageCircle, Phone } from "lucide-react";
import { COMPANY, WHATSAPP_MESSAGE } from "@/lib/site-data";

export function FloatingButtons() {
  return (
    <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col gap-3">
      <a
        href={`https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href={`tel:${COMPANY.phoneRaw}`}
        aria-label="Call Raj Ply Lam"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-wood shadow-gold hover:scale-110 transition-transform"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}

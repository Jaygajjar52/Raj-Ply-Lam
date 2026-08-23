import { Phone, MessageCircle, FileText } from "lucide-react";
import { COMPANY, WHATSAPP_MESSAGE } from "@/lib/site-data";
import { useQuoteForm } from "@/hooks/useQuoteForm";

export function MobileFooter() {
  const { openQuoteForm } = useQuoteForm();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-gold/15 grid grid-cols-3">
      <a
        href={`tel:${COMPANY.phoneRaw}`}
        className="flex flex-col items-center justify-center gap-1 py-3 text-beige/85 border-r border-white/5"
      >
        <Phone size={20} className="text-gold" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={`https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 py-3 text-beige/85 border-r border-white/5"
      >
        <MessageCircle size={20} className="text-[#25D366]" />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <button
        onClick={() => openQuoteForm()}
        className="flex flex-col items-center justify-center gap-1 py-3 text-wood bg-gold-gradient"
      >
        <FileText size={20} />
        <span className="text-[11px] font-semibold">Get Quote</span>
      </button>
    </div>
  );
}

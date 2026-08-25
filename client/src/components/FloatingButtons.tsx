import { Phone } from "lucide-react";
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
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
        >
          <path d="M16.04 3.2c-7.01 0-12.71 5.7-12.71 12.71 0 2.24.59 4.43 1.72 6.35L3.2 29.07l6.98-1.83a12.68 12.68 0 0 0 5.86 1.49h.01c7.01 0 12.71-5.7 12.71-12.71 0-3.4-1.32-6.59-3.72-8.99a12.61 12.61 0 0 0-9-3.83Zm.01 23.38h-.01c-1.87 0-3.7-.5-5.31-1.45l-.4-.24-4.14 1.09 1.1-4.04-.26-.41a10.51 10.51 0 0 1-1.61-5.6c0-5.86 4.77-10.62 10.63-10.62 2.84 0 5.51 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.51c0 5.86-4.77 10.64-10.62 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
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

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface QuoteFormContextValue {
  isOpen: boolean;
  prefillProduct: string | null;
  openQuoteForm: (product?: string) => void;
  closeQuoteForm: () => void;
}

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillProduct, setPrefillProduct] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      isOpen,
      prefillProduct,
      openQuoteForm: (product?: string) => {
        setPrefillProduct(product ?? null);
        setIsOpen(true);
      },
      closeQuoteForm: () => setIsOpen(false),
    }),
    [isOpen, prefillProduct]
  );

  return <QuoteFormContext.Provider value={value}>{children}</QuoteFormContext.Provider>;
}

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) throw new Error("useQuoteForm must be used within a QuoteFormProvider");
  return ctx;
}

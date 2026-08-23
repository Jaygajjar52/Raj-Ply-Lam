import { Modal } from "@/components/ui/Modal";
import { QuoteFormFields } from "@/components/QuoteFormFields";
import { useQuoteForm } from "@/hooks/useQuoteForm";

export function QuoteFormModal() {
  const { isOpen, prefillProduct, closeQuoteForm } = useQuoteForm();

  return (
    <Modal open={isOpen} onClose={closeQuoteForm} title="Get a Quote">
      <p className="eyebrow mb-2">Get In Touch</p>
      <h3 className="font-display text-2xl font-semibold text-cream mb-6">Request a Free Quote</h3>
      <QuoteFormFields
        defaultProduct={prefillProduct}
        compact
        onSuccess={() => setTimeout(closeQuoteForm, 2500)}
      />
    </Modal>
  );
}

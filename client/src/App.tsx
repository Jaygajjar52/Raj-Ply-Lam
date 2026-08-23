import { Routes, Route, Navigate } from "react-router-dom";
import { QuoteFormProvider } from "@/hooks/useQuoteForm";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Statistics } from "@/components/Statistics";
import { Products } from "@/components/Products";
import { Brands } from "@/components/Brands";
import { FounderVision } from "@/components/FounderVision";
import { AboutUs } from "@/components/AboutUs";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { QuoteFormSection } from "@/components/QuoteFormSection";
import { GoogleMap } from "@/components/GoogleMap";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { MobileFooter } from "@/components/MobileFooter";
import { QuoteFormModal } from "@/components/QuoteFormModal";
import { AdminPage } from "@/pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <QuoteFormProvider>
            <div className="min-h-screen bg-wood text-cream selection:bg-gold selection:text-wood">
              <Navbar />
              <main>
                <Hero />
                <Statistics />
                <Products />
                <Brands />
                <FounderVision />
                <AboutUs />
                <Services />
                <Testimonials />
                <WhyChooseUs />
                <QuoteFormSection />
                <GoogleMap />
                <Contact />
              </main>
              <Footer />
              <FloatingButtons />
              <MobileFooter />
              <QuoteFormModal />
            </div>
          </QuoteFormProvider>
        }
      />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

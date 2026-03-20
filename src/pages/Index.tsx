import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import RescuesSection from "@/components/RescuesSection";
import PricingSection from "@/components/PricingSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <RescuesSection />
      <PricingSection />
      <LeadForm />
      <Footer />
    </div>
  );
};

export default Index;

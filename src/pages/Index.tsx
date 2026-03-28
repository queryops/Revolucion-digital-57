import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import RescuesSection from "@/components/RescuesSection";
import PricingSection from "@/components/PricingSection";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <RescuesSection />
      <PricingSection onSelectPlan={setSelectedPlan} />
      <LeadForm preSelectedPlan={selectedPlan} />
      <Footer />
    </div>
  );
};

export default Index;

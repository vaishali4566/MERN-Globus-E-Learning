import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#26283e] text-[#9aa4bf]">
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Landing;

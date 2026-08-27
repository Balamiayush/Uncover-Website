import AboutSection from "./_components/AboutSection";
import CeoSection from "./_components/CeoSection";
import ContactUsSection from "./_components/ContactUsSection";
import CredibilityStripSection from "./_components/CredibilityStripSection";
import FAQ from "./_components/FAQ";
import HeroSection from "./_components/HeroSection";
import IndustriesWeWork from "./_components/IndustriesWeWork";
import MethodScrollSection from "./_components/MethodScrollSection";
import OurScopeofWork from "./_components/OurScopeofWork";
import ScatteredPhrasesSection from "./_components/ScatteredPhrasesSection";
import TheProblemSection from "./_components/TheProblemSection";
import WeBuildUncoverSection from "./_components/WeBuildUncoverSection";
import WhatWeDo from "./_components/WhatWeDo";

export default function page() {
  return (
    <div className="w-full h-full relative ">
      <HeroSection />
       <AboutSection />
      <ScatteredPhrasesSection />
      <TheProblemSection/>
      <WhatWeDo />
      <OurScopeofWork/>
      <WeBuildUncoverSection/>
      <CredibilityStripSection />
      <CeoSection/>
      <IndustriesWeWork /> 
      <MethodScrollSection />
      <ContactUsSection/>
      <FAQ/>
    </div>
  );
}

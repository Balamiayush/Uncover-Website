import AboutSection from "./_components/AboutSection";
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
import WhoIsThisSection from "./_components/WhoIsThisSection";

export default function page() {
  return (
    <div className="w-full h-full relative ">
      <HeroSection />
      <AboutSection />
      <TheProblemSection/>
      <WhatWeDo />
      <WeBuildUncoverSection/>
      <CredibilityStripSection />
      <ScatteredPhrasesSection />
      <IndustriesWeWork />
      <OurScopeofWork/>
      <FAQ/>
      <MethodScrollSection />
    </div>
  );
}

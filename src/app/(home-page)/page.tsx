
import AboutSection from "./_components/AboutSection";
import CredibilityStripSection from "./_components/CredibilityStripSection";
import HeroSection from "./_components/HeroSection";
import IndustriesWeWork from "./_components/IndustriesWeWork";
import MethodScrollSection from "./_components/MethodScrollSection";
import ScatteredPhrasesSection from "./_components/ScatteredPhrasesSection";
import WhatWeDo from "./_components/WhatWeDo";



export default function page() {
  return (
    <div className="w-full h-full relative ">
  <HeroSection/>
<AboutSection/>
<WhatWeDo/>
<CredibilityStripSection/>
<ScatteredPhrasesSection/>
<IndustriesWeWork/>
<MethodScrollSection/>
    </div>
  );
}

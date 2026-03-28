//import { CTASection } from "@/components/landingpage/CTA-Section";
import { Hero } from "./features/landing/sections/Hero";
import { HowItWorks } from "./features/landing/sections/How-It-Works";
//import { ValueProps } from "@/components/landingpage/Value-Props";
import { ProductPreview } from "./features/landing/sections/Product-Preview";
//import Audience from "@/components/landingpage/Audience";
import { NavBar } from "./features/landing/sections/Nav-Bar";
import { LandingFooter } from "./features/landing/sections/LandingFooter";

export default function Home() {

  /**See components/landingpage for each component */
  return (
    /**MaxWidthWrapper ensures the margins of the landing are crisp */
    /**I've chose to make the Landing in this way, for ease of further developments like AI agents, translations. */
    <>
      
      {/** Go to components/landingpage for each of the sections. */}
      <NavBar/>

      <Hero/>

      <ProductPreview/>

      <HowItWorks/>

      {/* <ValueProps/>
      
      <Audience/>
      
      <CTASection/> 
      */}
      
      <LandingFooter/>

        
    
    {/** The section that should go after this found in ValueProp.tsx */}

    {/**The </> below is called a react fragment... helps maintain react rules of only passing one element  */}
      
  </>
  );
}

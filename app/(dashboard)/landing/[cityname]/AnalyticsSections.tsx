"use client"
import { useState } from 'react';
import SectionNavbar from './CityDashboardComponents/SectionNavbar'
import OverviewSection from './CityDashboardComponents/OverviewSection';
import DemographicsSection from './CityDashboardComponents/DemographicsSection';

export default function AnalyticsSections() {

    const [activeSection, setActiveSection] = useState("overview") // always starts at overview section!
    const renderSectionContent = () => {
    /* 
    This function Renders the differnt Section content depending on the state
    */
    
    /* need to make a function here incase a the information isn't found... */

    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection/>
        )

      case "demographics":
        return (
          <DemographicsSection/>
        )
        // more sections can be added as well.. later!!


      default:
        return null;
    }
  };

  return (
    <>
      {/* nIIIIICE! only two lines of code and that's it. */}
     <SectionNavbar activeSection={activeSection} onSectionChange={setActiveSection}/>   
     <div className="space-y-3">{renderSectionContent()}</div>
    </>
  )
}


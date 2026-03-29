
import { useData } from "@/app/providers/DataProvider";
import PageHeader from "./CityDashboardComponents/PageHeader";
import { createClient } from "@/app/lib/supabase/server";
import AnalyticsSections from "./AnalyticsSections";




interface CityDashboardProps {
  params: Promise<{ cityname: string }>;  // params is now Promise
}

/* 
This page has multiple pieces being put together. 
The header section is a separate server component, ant the interactive sections are client components
*/
export default async function CityDashboardPage({params}:CityDashboardProps) {
    
    //const supabase = await createClient()

    


    //The actuall rendering happens in client functions
    return(
        <div className="md:pl-5 md:pr-5 space-y-4">
        <PageHeader/>
        
        <AnalyticsSections/>
        
        </div>
        

    )}


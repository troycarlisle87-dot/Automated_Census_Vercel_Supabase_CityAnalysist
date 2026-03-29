"use client";

import { MaxWidthWrapper } from "@/app/components/globals/MaxWidthWrapper";
import { SearchBar } from "@/app/components/ui/searchbar";

import Link from "next/link";
import { municipalities } from "@/app/lib/test_data";
import { Card, CardTitle } from "@/app/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Municipality } from "@/app/lib/types";
import { Button } from "@/app/components/ui/button";

// the data provider
import { useData } from "@/app/providers/DataProvider";


/* 
This page only has the searchbar landing page on it... it only calls data of municipalities from the supabase db.

*/
export default function DashboardLanding() {
  
  // the provider that shares userid and the city geo_uid that a user selects
  const {setData} = useData()

  //basic functions that'll be used on this page
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("") 
  const [searchResults, setSearchResults] = useState<Municipality[]>([])


  // function handles the search of a user
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length < 2) {
      setSearchResults([]) // sets the results as empty...
      return // nothing is returned
    }

    // Filter municipalities (name or CSD)
    const results = municipalities.filter(muni =>
      muni.name.toLowerCase().includes(term.toLowerCase()) ||
      muni.csd.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results.slice(0, 5)); // only top 5
  };

  // when a city is selected, they are forwarded to a page for them
  const goToCity = (cityId: string) => {
    let geo_uid = 0 // for now         <--------- fix when actuall data inside
    setData(geo_uid)
    router.push(`/landing/${cityId}`);
  };
  
  const updateDataProvider = (geou_id:number) =>{
    // update the provider
     let geo_uid = 0  // <--------- fix when actuall data inside
    setData(geo_uid)
  }



  return (
    <MaxWidthWrapper className="min-h-screen flex flex-col items-center justify-center space-y-12 bg-background p-4">
      {/* Hero + Search */}
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
            Municipal Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Select a municipality or search to get started.
          </p>
        </div>
        
        {/* Perfectly centered SearchBar */}
        <div className="flex justify-center">
          <SearchBar 
            placeholder="Search municipalities by name or CSD..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md shadow-lg"  // ← Perfect centering + subtle shadow
          />
        </div>
      </div>

      {/* Search Results Placeholder */}
      {searchResults.length > 0 && (
        <div className="w-full max-w-2xl">
          <div className="bg-card border rounded-lg shadow-sm">
            <div className="px-4 py-2 border-b">
              <h3 className="text-sm font-semibold text-muted-foreground">
        
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} {/* my fav small touch */}
            </h3>
          </div>
          <div className="space-y-0.5">
            {searchResults.map((muni) => (
              <Button 
                key={muni.id}
                variant="ghost" 
                className="w-full justify-start h-12 px-4 hover:bg-accent"
                onClick={() => goToCity(muni.id)}
              >
                <span className="font-medium truncate flex-1">{muni.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {muni.csd}
                </span>
              </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      



      {/* Featured Grid */}
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-2">Featured Municipalities</h3>
          <p className="text-muted-foreground">Or browse popular cities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {municipalities.slice(0, 9).map((muni) => (
            <Link key={muni.id} href={`/landing/${muni.id}`} className="block" >
              <Card className="h-full p-6 hover:shadow-xl transition-all group border-0 hover:border-primary/50">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                  {muni.name}
                </CardTitle>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>CSD: <span className="font-mono">{muni.csd}</span></p>
                  <p>Population: {muni.population.toLocaleString()}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

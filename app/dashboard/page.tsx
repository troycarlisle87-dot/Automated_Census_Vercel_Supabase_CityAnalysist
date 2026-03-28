"use client"; // this gotta be a  client component for search


import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { municipalities } from "../lib/test/test_data";
import { Municipality } from "../features/dashboard/utils/types";
import { MaxWidthWrapper } from "../components/globals/MaxWidthWrapper";
import { Button } from "../components/ui/button";
import { Card, CardTitle } from "../components/ui/card";
import { SearchBar } from "../components/ui/searchbar";


/* 
This code will be here untill I decide to refactor it.... the search feature isn't robust enough yet...
for it to be turned into a component, YET!
*/
export default function DashboardLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Municipality[]>([]);
  const router = useRouter();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    // Filter municipalities (name or CSD)
    const results = municipalities.filter(muni =>
      muni.name.toLowerCase().includes(term.toLowerCase()) ||
      muni.csd.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results.slice(0, 5)); // Top 5
  };

 const goToCity = (slug: string) => {
  router.push(`/dashboard/${slug}`);
};

  return (
    <MaxWidthWrapper className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-background p-4
">
      <div className="text-center mb-16">
        {/* OLD CLASSNAME LOL: className="text-5xl font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent mb-6" */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
          Municipal Intelligence
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Select a municipality or search to get started.
        </p>
        
        {/* Global search bar... fav feature */}
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            placeholder="Search municipalities by name or CSD..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
      </div>

      {/* Search results (if any)..gotta be aligned */}
      {/* Searched around on what good search features hav... and this is defo it */}
      {/* Before this was PLAINN! */}
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
              onClick={() => goToCity(muni.slug)}
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

      {/* featured cities grid... superr clean UI i thnk */}
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-2">Featured Municipalities</h3>
          <p className="text-muted-foreground">Or browse popular cities</p>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {municipalities.slice(0, 9).map((muni) => (
          <Link key={muni.id} href={`/dashboard/${muni.id}`} className="block">
            <Card className="h-full p-6 hover:shadow-xl transition-all group border-0 hover:border-primary/50">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                {muni.name}
              </CardTitle>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>CSD: <span className="font-mono">{muni.csd}</span></p> {/* making the CSD abit fancy... */}
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


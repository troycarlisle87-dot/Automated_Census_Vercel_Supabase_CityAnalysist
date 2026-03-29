
import { Button } from '@/app/components/ui/button'
import { formatDate } from '@/app/lib/utils'
import { PlusCircle, SplitIcon } from 'lucide-react'
import Link from 'next/link'


const PageHeader = () => {
  return (
    
    <section className="space-y-4">
        {/* Municipal info bar */}
        {/* Doesn't need to be made into component... yet */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card rounded-lg p-6 border">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{"name"}</h1>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{"csd"}</span>
              <span>Last updated: {"formatDate(municipality.lastUpdated)"}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
              <span>Region: {'municipality?.region || "Not available"'}</span>

              <span>Population: {"municipality.population.toLocaleString()"}</span>
            </div>
            
          
          </div>

          {/* The watchlist & compare */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <PlusCircle/> Watchlist 
            </Button>
            <Link href={"/landing/analytics"}>
              <Button variant="outline" size="sm">
                <SplitIcon/> Compare 
              </Button>
            </Link>
          </div>
        </div>

    </section>
  )
}

export default PageHeader


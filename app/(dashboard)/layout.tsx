import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

import { Separator } from "../components/ui/separator"
import { SidebarInset } from "../components/ui/sidebar"
import { TooltipProvider } from "../components/ui/tooltip"
import { DataProvider } from "../providers/DataProvider"



export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <SidebarProvider style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger variant={"outline"} className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        
        </header>
      <main>
        
        <TooltipProvider>
            <DataProvider>
              {children}
            </DataProvider>
          </TooltipProvider>
      </main>
       </SidebarInset>
    </SidebarProvider>
  )
}
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/components/ui/sidebar"
import { Building,  Home, Star } from "lucide-react"
import { buttonVariants } from "./ui/button"


/// jst add a line name and route and the to auto add asection to the sidbar
const data = {
  navMain: [
    {
      title: "Home", // name
      url: "/landing",// route to this page
      icon: Home
    },
    {
      title: "Watchlist",
      icon: Star,
      url: "#",
    },
    {
      title: "Market Insights",
      url: "#",
      items: [
        {
          title: "Real Estate",
          icon: Building,
          url: "#",
        },
        
      ],
    },
        
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
        {/* Eventually... the user's profile will be set here with the details of their acces in the header.. the header will go */}
            <Link href = "/landing" className = {buttonVariants({variant:'ghost', size:'lg'})} >
                <Image
                    src="/Logo1.svg"
                    alt="City Analysis"
                    width={142}
                    height={42}
                />
            </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild >
                          {/* was i the above ... was causing error---> isActive={item.isActive} */} 
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

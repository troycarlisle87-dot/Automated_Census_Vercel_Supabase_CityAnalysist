import { BarChart2Icon, Building, Home, NewspaperIcon, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/app/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Watchlist",
    url: "#",
    icon: Star,
  },
  {
    title: "Real Estate",
    url: "#",
    icon: Building,
  },
  {
    title: "Market Insights",
    url: "#",
    icon: BarChart2Icon,
  },
  {
    title: "News",
    url: "#",
    icon: NewspaperIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupLabel className="mt-3.5 items-center">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            <Image
              src="/Logo1.svg"
              alt="City Analysis"
              width={142}
              height={42}
            />
          </Link>
        </SidebarGroupLabel>

        <SidebarSeparator className="mt-0.5" />

        <SidebarGroup className="mt-10 gap-5">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <a href={item.url}>
                      <item.icon />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
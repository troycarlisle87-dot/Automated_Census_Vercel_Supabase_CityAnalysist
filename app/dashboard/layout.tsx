import type { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "../components/ui/sidebar";
import { AppSidebar } from "../features/dashboard/components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger />

      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-background">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
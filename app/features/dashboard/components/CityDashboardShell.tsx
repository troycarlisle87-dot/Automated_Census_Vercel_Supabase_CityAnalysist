"use client";

import React, { useState } from "react";
import { DashboardNavbar } from "./DashboardNavbar";
import { CityDashboard } from "../CityDashboard";
import type { MunicipalityDashboardData } from "@/app/lib/supabase/municipalities";

interface ShellDashboardProps {
  initialMunicipality: MunicipalityDashboardData;
}

export const CityDashboardShell = ({
  initialMunicipality,
}: ShellDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="space-y-8">
      <DashboardNavbar
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <CityDashboard initialMunicipality={initialMunicipality} />
    </main>
  );
};
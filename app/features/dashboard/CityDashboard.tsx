"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { PlusCircle, SplitIcon } from "lucide-react";
import SectionNavbar from "./components/SectionNavbar";
import OverviewSection from "./components/OverviewSection";
import FinancialsSection from "./components/FinancialsSection";
import DemographicsSection from "./components/DemographicsSection";
import { HistorySection } from "./components/HistorySection";
import AdministrationSection from "./components/AdministrationSection";

import { Municipality } from "./utils/types";
import { formatDate } from "@/app/lib/utils";

interface DashboardProps {
  initialMunicipality: Municipality;
}

export const CityDashboard = ({ initialMunicipality }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState("overview");

  const municipality = initialMunicipality;

  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return (
    <OverviewSection
      municipalityid={municipality.id}
      budgetData={[
        { month: "Jan", planned: 0, actual: 0 },
        { month: "Feb", planned: 0, actual: 0 },
        { month: "Mar", planned: 0, actual: 0 },
      ]}
      kpis={[
        {
          name: "Budget Utilization",
          current: 0,
          target: 0,
          trend: "stable",
          unit: "%",
          color: "primary",
        },
        {
          name: "Service Uptime",
          current: 0,
          target: 0,
          trend: "stable",
          unit: "%",
          color: "success",
        },
      ]}
    />
  );

      case "financials":
        return <FinancialsSection />;

      case "demographics":
        return (
  <DemographicsSection
    demographicsData={[
      { ageGroup: "0-14", population: 0, percentage: 0 },
      { ageGroup: "15-24", population: 0, percentage: 0 },
      { ageGroup: "25-44", population: 0, percentage: 0 },
      { ageGroup: "45-64", population: 0, percentage: 0 },
      { ageGroup: "65+", population: 0, percentage: 0 },
    ]}
  />
);

      case "history":
        return <HistorySection />;

      case "administration":
        return <AdministrationSection />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{municipality.name}</h1>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{municipality.csd}</span>
            <span>Last updated: {formatDate(municipality.lastUpdated)}</span>
          </div>

          <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Region: {municipality.region || "Not available"}</span>
            <span>Population: {municipality.population.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PlusCircle /> Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <SplitIcon /> Compare
          </Button>
        </div>
      </div>

      <SectionNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="space-y-3">{renderSectionContent()}</div>
    </div>
  );
};
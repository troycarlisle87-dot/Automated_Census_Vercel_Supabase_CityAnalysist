"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BudgetPoint = {
  month: string;
  planned: number;
  actual: number;
};

type KPI = {
  name: string;
  current: number;
  target: number;
  trend: string;
  unit: string;
  color: string;
};

interface OverviewSectionProps {
  municipalityid: string;
  budgetData: BudgetPoint[];
  kpis: KPI[];
}

const OverviewSection = ({
  municipalityid,
  budgetData,
  kpis,
}: OverviewSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Budget Trends</CardTitle>
          <CardDescription>Monthly overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" minHeight={300}>
            <LineChart data={budgetData} margin={{ left: 10 }}>
              <CartesianGrid />
              <XAxis dataKey="month" name="Month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="planned" type="monotone" stroke="#7f22fe" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="99%" height={300}>
            <RadarChart data={kpis}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                dataKey="current"
                stroke="#7f22fe"
                fillOpacity={0.6}
                fill="#8884d8"
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
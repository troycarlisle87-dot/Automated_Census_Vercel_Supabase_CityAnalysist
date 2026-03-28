import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";

type DemographicPoint = {
  ageGroup: string;
  population: number;
  percentage: number;
};

interface DemographicsSectionProps {
  demographicsData: DemographicPoint[];
}

const DemographicsSection = ({
  demographicsData,
}: DemographicsSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Population Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
            Population line chart
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" minHeight={300}>
            <BarChart data={demographicsData}>
              <CartesianGrid />
              <YAxis />
              <Bar dataKey="population" />
              <XAxis dataKey="ageGroup" name="Age Group" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemographicsSection;
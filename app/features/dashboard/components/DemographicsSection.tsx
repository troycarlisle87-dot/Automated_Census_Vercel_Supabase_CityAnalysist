"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DemographicsSectionProps {
  demographicsData: {
    ageGroup: string;
    population: number;
    percentage: number;
  }[];
}

export default function DemographicsSection({
  demographicsData,
}: DemographicsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Population by Age Group</h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demographicsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <Tooltip
               formatter={(value) =>
                typeof value === "number" ? value.toLocaleString() : String(value)
              }
              />
              <Bar dataKey="population" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Age Group Percentage</h2>

        <div className="space-y-4">
          {demographicsData.map((group) => (
            <div key={group.ageGroup} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{group.ageGroup}</span>
                <span>{group.percentage.toFixed(1)}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${group.percentage}%` }}
                />
              </div>

              <div className="text-xs text-muted-foreground">
                {group.population.toLocaleString()} residents
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
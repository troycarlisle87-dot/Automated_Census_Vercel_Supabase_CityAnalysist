import { Municipality } from "@/app/features/dashboard/utils/types";

// Municipalities data
export const municipalities: Municipality[] = [
  {
    id: "kitchener",
    slug: "kitchener",
    name: "City of Kitchener",
    csd: "3530021",
    timezone: "America/Toronto",
    region: "The Waterloo region",
    budget: 12400000,
    servicesCount: 23,
    population: 256885,
    status: "healthy",
    lastUpdated: new Date("2026-01-15"),
  },
  {
    id: "brantford",
    slug: "brantford",
    name: "City of Brantford",
    csd: "3529006",
    region: "Brant County",
    timezone: "America/Toronto",
    budget: 8900000,
    servicesCount: 19,
    population: 104688,
    status: "warning",
    lastUpdated: new Date("2026-01-14"),
  },
  {
    id: "waterloo",
    slug: "waterloo",
    name: "City of Waterloo",
    csd: "3530020",
    timezone: "America/Toronto",
    region: "The Waterloo region",
    budget: 11200000,
    servicesCount: 21,
    population: 121161,
    status: "healthy",
    lastUpdated: new Date("2026-01-16"),
  },
];
export const kpis = [
  {
    name: "Budget Utilization",
    current: 7.8,
    target: 8.5,
    trend: "up",
    unit: "%",
    color: "primary",
  },
  {
    name: "Service Uptime",
    current: 9.89,
    target: 99,
    trend: "stable",
    unit: "/10",
    color: "success",
  },
  {
    name: "Citizen Satisfaction",
    current: 8.3,
    target: 9.5,
    trend: "down",
    unit: "/10",
    color: "warning",
  },
];
export const budgetData = [
  { month: "Jan", planned: 980000, actual: 920000 },
  { month: "Feb", planned: 1020000, actual: 990000 },
  { month: "Mar", planned: 950000, actual: 975000 },
  { month: "Apr", planned: 1080000, actual: 1045000 },
  { month: "May", planned: 990000, actual: 1012000 },
  { month: "Jun", planned: 1050000, actual: 1023000 },
];
export const demographicsData = [
  { ageGroup: "0-14", population: 45200, percentage: 17.6 },
  { ageGroup: "15-24", population: 32800, percentage: 12.8 },
  { ageGroup: "25-44", population: 68500, percentage: 26.7 },
  { ageGroup: "45-64", population: 52000, percentage: 20.3 },
  { ageGroup: "65+", population: 37500, percentage: 14.6 },
];
// Export a convenience function to get municipality by ID
export function getMunicipalityById(id: string) {
  return municipalities.find((m) => m.id === id) ?? null;
}
import { Municipality } from "@/app/features/dashboard/utils/types";

// Municipalities data
export const municipalities: Municipality[] = [
  {
    id: "kitchener",
    slug: "kitchener",
    geo_uid: 3530013,
    name: "City of Kitchener",
    csd: "3530013",
    timezone: "America/Toronto",
    region: "The Waterloo region",
    budget: 12400000,
    servicesCount: 23,
    population: 256885,
    status: "healthy",
    type: "CY",
    lastUpdated: new Date("2026-01-15"),
  },
  {
    id: "brantford",
    slug: "brantford",
    geo_uid: 3529006,
    name: "City of Brantford",
    csd: "3529006",
    region: "Brant County",
    timezone: "America/Toronto",
    budget: 8900000,
    servicesCount: 19,
    population: 104688,
    status: "warning",
    type: "CY",
    lastUpdated: new Date("2026-01-14"),
  },
  {
    id: "waterloo",
    slug: "waterloo",
    geo_uid: 3530016,
    name: "City of Waterloo",
    csd: "3530016",
    timezone: "America/Toronto",
    region: "The Waterloo region",
    budget: 11200000,
    servicesCount: 21,
    population: 121436,
    status: "healthy",
    type: "CY",
    lastUpdated: new Date("2026-01-16"),
  },
];

// KPI data (for overview section)
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
  {
    name: "Response Time",
    current: 7.65,
    target: 9.0,
    trend: "up",
    unit: "/10",
    color: "destructive",
  },
  {
    name: "Project Completion",
    current: 4.25,
    target: 6,
    trend: "up",
    unit: "/10",
    color: "primary",
  },
];

// Financial data (for financials section)
export const budgetData = [
  { month: "Jan", planned: 980000, actual: 920000 },
  { month: "Feb", planned: 1020000, actual: 990000 },
  { month: "Mar", planned: 950000, actual: 975000 },
  { month: "Apr", planned: 1080000, actual: 1045000 },
  { month: "May", planned: 990000, actual: 1012000 },
  { month: "Jun", planned: 1050000, actual: 1023000 },
];

export const budgetAllocation = [
  { category: "Public Safety", amount: 3200000, percentage: 26 },
  { category: "Infrastructure", amount: 2800000, percentage: 22 },
  { category: "Parks & Recreation", amount: 1900000, percentage: 15 },
  { category: "Administration", amount: 1500000, percentage: 12 },
  { category: "Social Services", amount: 1300000, percentage: 10 },
  { category: "Debt Service", amount: 1100000, percentage: 9 },
  { category: "Other", amount: 880000, percentage: 7 },
];

// Demographics data
export const demographicsData = [
  { ageGroup: "0-14", population: 45200, percentage: 17.6 },
  { ageGroup: "15-24", population: 32800, percentage: 12.8 },
  { ageGroup: "25-44", population: 68500, percentage: 26.7 },
  { ageGroup: "45-64", population: 52000, percentage: 20.3 },
  { ageGroup: "65+", population: 37500, percentage: 14.6 },
];

export const populationHistory = [
  { year: 2020, population: 233400 },
  { year: 2021, population: 240200 },
  { year: 2022, population: 247800 },
  { year: 2023, population: 252100 },
  { year: 2024, population: 256885 },
  { year: 2025, population: 261200 },
];

// Recent activity for feed
export const recentActivity = [
  {
    id: 1,
    type: "budget-update",
    municipality: "Kitchener",
    message: "Budget updated for Q1 2026",
    timestamp: "2h ago",
  },
  {
    id: 2,
    type: "alert",
    municipality: "Brantford",
    message: "Service outage: Water main break",
    timestamp: "4h ago",
  },
  {
    id: 3,
    type: "report",
    municipality: "Waterloo",
    message: "New citizen satisfaction report published",
    timestamp: "1d ago",
  },
];

// Staff/Administration data
export const staffData = [
  { department: "Finance", count: 42, avgPerformance: 4.2 },
  { department: "Public Works", count: 156, avgPerformance: 4.1 },
  { department: "Planning", count: 28, avgPerformance: 4.4 },
  { department: "Parks", count: 67, avgPerformance: 4.0 },
  { department: "Administration", count: 34, avgPerformance: 4.3 },
];

// Export a convenience function to get municipality by ID
// test_data.ts
export function getMunicipalityById(id: string) {
  return municipalities.find((m) => m.id === id) ?? null;  // id = "kitchener"
}

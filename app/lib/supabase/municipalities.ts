import { createClient } from "@supabase/supabase-js";
import type { Municipality } from "@/app/features/dashboard/utils/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DemographicPoint = {
  ageGroup: string;
  population: number;
  percentage: number;
};

export type HistoricalPopulationPoint = {
  year: number;
  population: number;
};

export type HistoricalIncomePoint = {
  year: number;
  householdIncome: number;
  householdIncomeAT: number;
};

export type MunicipalityDashboardData = Municipality & {
  ageAverage: number;
  ageMedian: number;
  householdIncome: number;
  householdIncomeAT: number;
  demographicsData: DemographicPoint[];
  historicalPopulationData: HistoricalPopulationPoint[];
  historicalIncomeData: HistoricalIncomePoint[];
};

export async function getMunicipalityBySlug(
  slug: string
): Promise<MunicipalityDashboardData | null> {
  const { data: municipalityRow, error: municipalityError } = await supabase
    .from("municipalities")
    .select("*")
    .ilike("slug", slug)
    .maybeSingle();

  if (municipalityError) {
    console.error("Error loading municipality:", municipalityError.message);
    return null;
  }

  if (!municipalityRow) {
    return null;
  }

  const { data: demographicsRows, error: demographicsError } = await supabase
    .from("fact_demographics")
    .select("*")
    .eq("geo_uid", municipalityRow.geo_uid)
    .order("year", { ascending: true });

  if (demographicsError) {
    console.error("Error loading demographics:", demographicsError.message);
    return null;
  }

  const rows = demographicsRows ?? [];

  const latestRow = [...rows].sort((a, b) => Number(b.year) - Number(a.year))[0];

  const totalPopulation = latestRow?.population ?? 0;
  const age0to14 = latestRow?.["Age_0-14"] ?? 0;
  const age15to64 = latestRow?.["Age_15-64"] ?? 0;
  const age65 = latestRow?.["Age_65"] ?? 0;

  const demographicsData: DemographicPoint[] = [
    {
      ageGroup: "0-14",
      population: age0to14,
      percentage: totalPopulation > 0 ? (age0to14 / totalPopulation) * 100 : 0,
    },
    {
      ageGroup: "15-64",
      population: age15to64,
      percentage: totalPopulation > 0 ? (age15to64 / totalPopulation) * 100 : 0,
    },
    {
      ageGroup: "65+",
      population: age65,
      percentage: totalPopulation > 0 ? (age65 / totalPopulation) * 100 : 0,
    },
  ];

  const historicalPopulationData: HistoricalPopulationPoint[] = rows.map((row) => ({
    year: Number(row.year),
    population: row.population ?? 0,
  }));

  const historicalIncomeData: HistoricalIncomePoint[] = rows.map((row) => ({
    year: Number(row.year),
    householdIncome: row.householdIncome ?? 0,
    householdIncomeAT: row.householdIncome_AT ?? 0,
  }));

  return {
    id: String(municipalityRow.geo_uid),
    slug: municipalityRow.slug,
    geo_uid: municipalityRow.geo_uid,
    name: municipalityRow.region_name ?? "",
    csd: String(municipalityRow.geo_uid),
    region: municipalityRow.region_name ?? "",
    timezone: "America/Toronto",
    budget: 0,
    servicesCount: 0,
    population: totalPopulation,
    status: "healthy",
    type: municipalityRow.type,
    lastUpdated: municipalityRow.updated_at
      ? new Date(municipalityRow.updated_at)
      : new Date(),

    ageAverage: latestRow?.Age_Average ?? 0,
    ageMedian: latestRow?.Age_Median ?? 0,
    householdIncome: latestRow?.householdIncome ?? 0,
    householdIncomeAT: latestRow?.householdIncome_AT ?? 0,

    demographicsData,
    historicalPopulationData,
    historicalIncomeData,
  };
}
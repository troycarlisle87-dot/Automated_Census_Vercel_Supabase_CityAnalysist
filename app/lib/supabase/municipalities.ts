import { createClient } from "@supabase/supabase-js";
import type { Municipality } from "@/app/features/dashboard/utils/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getMunicipalityBySlug(
  slug: string
): Promise<Municipality | null> {
  const { data, error } = await supabase
    .from("muncipalities")
    .select("*")
    .ilike("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    id: String(data.geo_uid),
    slug: data.slug,
    geo_uid: data.geo_uid,
    name: data.region_name ?? "",
    csd: String(data.geo_uid),
    region: data.region_name ?? "",
    timezone: "America/Toronto",
    budget: 0,
    servicesCount: 0,
    population: 0,
    status: "healthy",
    type: data.type,
    lastUpdated: data.updated_at ? new Date(data.updated_at) : new Date(),
  };
}
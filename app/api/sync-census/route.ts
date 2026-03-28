import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function normalizeSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    // Replace this with the real CensusMapper endpoint you plan to use.
    const censusUrl = `${process.env.CENSUS_API_URL}?api_key=${process.env.CENSUS_API_KEY}`;

    const response = await fetch(censusUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.text();
      return NextResponse.json(
        { error: "Census API request failed", status: response.status, body },
        { status: 500 }
      );
    }

    const raw = await response.json();

    // Adjust this mapping to the actual CensusMapper response shape.
    const sourceRows = Array.isArray(raw?.results) ? raw.results : Array.isArray(raw) ? raw : [];

    const municipalityRows = sourceRows.map((item: any) => ({
      geo_uid: Number(item.geo_uid),
      region_name: item.region_name,
      slug: normalizeSlug(item.region_name),
      type: item.type ?? "CSD",
      updated_at: new Date().toISOString(),
    }));

    const demoRows = sourceRows.map((item: any) => ({
      city_id: null, // fill later if you create/need a city mapping table
      year: Number(item.year ?? new Date().getFullYear()),
      population_average: Number(item.population_average ?? item.population ?? 0),
      geo_uid: Number(item.geo_uid),
      updated_at: new Date().toISOString(),
    }));

    if (municipalityRows.length > 0) {
      const { error: municipalitiesError } = await supabase
        .from("muncipalities")
        .upsert(municipalityRows, { onConflict: "geo_uid" });

      if (municipalitiesError) {
        return NextResponse.json(
          { error: "Failed to upsert municipalities", details: municipalitiesError.message },
          { status: 500 }
        );
      }
    }

    if (demoRows.length > 0) {
      const { error: demographicsError } = await supabase
        .from("fact_demographics")
        .upsert(demoRows, { onConflict: "geo_uid,year" });

      if (demographicsError) {
        return NextResponse.json(
          { error: "Failed to upsert demographics", details: demographicsError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      municipalitiesInserted: municipalityRows.length,
      demographicsInserted: demoRows.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const response = await fetch(
      `${process.env.CENSUS_API_URL}?api_key=${process.env.CENSUS_API_KEY}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch census API data" },
        { status: 500 }
      );
    }

    const raw = await response.json();

    const rows = raw.results.map((item: any) => ({
      geo_uid: Number(item.geo_uid),
      region_name: item.region_name,
      slug: slugify(item.region_name),
      type: item.type ?? "Municipality",
      updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from("muncipalities")
      .upsert(rows, {
        onConflict: "geo_uid",
      })
      .select();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inserted: rows.length,
      sample: data?.slice(0, 5),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
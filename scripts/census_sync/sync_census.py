import os
from datetime import datetime, timezone

from pycancensus import get_census
from supabase import create_client, Client


def main() -> None:
    supabase_url = os.environ["SUPABASE_URL"]
    supabase_secret_key = os.environ["SUPABASE_SECRET_KEY"]
    census_api_key = os.environ["CANCENSUS_API_KEY"]

    supabase: Client = create_client(supabase_url, supabase_secret_key)

    census_df = get_census(
        dataset="CA21",
        regions={
            "CSD": ["3521010", "3530013", "3530016", "3529006"]
        },
        vectors=["v_CA21_1"],
        level="CSD",
        labels="detailed",
        geo_format=None,
        api_key=census_api_key,
    )

    print(census_df.columns.tolist())

    for _, census_row in census_df.iterrows():
        row = {
            "geo_uid": int(census_row["GeoUID"]),
            "year": 2021,
            "population": int(census_row["Population"]) if census_row["Population"] is not None else 0,
            "Age_0-14": 0,
            "Age_15-64": 0,
            "Age_65": 0,
            "Age_Average": 0,
            "householdIncome": 0,
            "householdIncome_AT": 0,
            "Age_Median": 0,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }

        result = (
            supabase.table("fact_demographics")
            .upsert(row, on_conflict="geo_uid,year")
            .execute()
        )

        print(f"Upserted {row['geo_uid']} with population {row['population']}")
        print(result)


if __name__ == "__main__":
    main()
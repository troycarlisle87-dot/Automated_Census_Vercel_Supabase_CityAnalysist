import os
from datetime import datetime, timezone

from supabase import create_client, Client


def main() -> None:
    supabase_url = os.environ["SUPABASE_URL"]
    supabase_secret_key = os.environ["SUPABASE_SECRET_KEY"]

    supabase: Client = create_client(supabase_url, supabase_secret_key)

    # Pretend this block is the census result for now
    census_result = {
        "geo_uid": 3521010,
        "year": 2021,
        "population": 656480,
        "Age_0-14": 109315,
        "Age_15-64": 489245,
        "Age_65": 119395,
        "Age_Average": 41.1,
        "householdIncome": 102000,
        "householdIncome_AT": 89000,
        "Age_Median": 40.8,
    }

    row = {
        "geo_uid": census_result["geo_uid"],
        "year": census_result["year"],
        "population": census_result["population"],
        "Age_0-14": census_result["Age_0-14"],
        "Age_15-64": census_result["Age_15-64"],
        "Age_65": census_result["Age_65"],
        "Age_Average": census_result["Age_Average"],
        "householdIncome": census_result["householdIncome"],
        "householdIncome_AT": census_result["householdIncome_AT"],
        "Age_Median": census_result["Age_Median"],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

    result = (
        supabase.table("fact_demographics")
        .upsert(row, on_conflict="geo_uid,year")
        .execute()
    )

    print("Upsert complete.")
    print(result)


if __name__ == "__main__":
    main()
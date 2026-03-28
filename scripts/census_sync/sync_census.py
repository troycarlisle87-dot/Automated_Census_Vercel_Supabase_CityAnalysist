import os
from datetime import datetime, timezone

from pycancensus import get_census
from supabase import create_client, Client


def main() -> None:
    supabase_url = os.environ["SUPABASE_URL"]
    supabase_secret_key = os.environ["SUPABASE_SECRET_KEY"]

    supabase: Client = create_client(supabase_url, supabase_secret_key)

    census_df = get_census(
        dataset="CA21",
        regions={"CSD": "3521010"},
        vectors=["v_CA21_1"],
        level="CSD",
        labels="detailed",
        geo_format=None,
        api_key=os.environ["CANCENSUS_API_KEY"],
    )

    first_row = census_df.iloc[0]

    row = {
        "geo_uid": int(first_row["GeoUID"]),
        "year": 2021,
        "population": int(first_row["Population"]),
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

    print("Upsert complete.")
    print(result)


if __name__ == "__main__":
    main()
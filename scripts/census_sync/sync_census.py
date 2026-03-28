import os
from datetime import datetime, timezone

from supabase import create_client, Client


def main() -> None:
    supabase_url = os.environ["SUPABASE_URL"]
    supabase_secret_key = os.environ["SUPABASE_SECRET_KEY"]

    supabase: Client = create_client(supabase_url, supabase_secret_key)

    # Temporary test row so we confirm GitHub Actions -> Supabase works
    test_row = {
    "geo_uid": 3521010,
    "year": 2021,
    "population": 656480,
    "updated_at": datetime.now(timezone.utc).isoformat(),
}

    result = (
        supabase.table("fact_demographics")
        .upsert(test_row, on_conflict="geo_uid,year")
        .execute()
    )

    print("Upsert complete.")
    print(result)


if __name__ == "__main__":
    main()
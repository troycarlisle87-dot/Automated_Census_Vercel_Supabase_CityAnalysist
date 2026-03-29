# sync_census.py

from dotenv import load_dotenv
import os
from datetime import datetime, timezone

from pycancensus import get_census
from supabase import create_client, Client


YEAR_CONFIGS = [
    {
        "dataset": "CA21",
        "year": 2021,
        "vector_prefix": "v_CA21_",
        "vector_ids": {
            "population": 1,
            "age_0_14": 11,
            "age_15_64": 68,
            "age_65": 251,
            "age_average": 386,
            "age_median": 389,
            "household_income": 906,
            "household_income_at": 907,
        },
        "defaults": {},
    },
    {
        "dataset": "CA16",
        "year": 2016,
        "vector_prefix": "v_CA16_",
        "vector_ids": {
            "population": 401,
            "age_0_14": 4,
            "age_15_64": 61,
            "age_65": 244,
            "age_average": 379,
            "household_income": 2397,
            "household_income_at": 2398,
        },
        "defaults": {
            "Age_Median": 0.0,
        },
    },
    {
        "dataset": "CA11",
        "year": 2011,
        "vector_prefix": "v_CA11F_",
        "vector_ids": {
            "population": 1,
            "age_0_4": 5,
            "age_5_9": 8,
            "age_10_14": 14,
            "age_15_19": 17,
            "age_20_24": 35,
            "age_25_29": 38,
            "age_30_34": 41,
            "age_35_39": 44,
            "age_40_44": 47,
            "age_45_49": 50,
            "age_50_54": 53,
            "age_55_59": 56,
            "age_60_64": 59,
            "age_65_69": 62,
            "age_70_74": 65,
            "age_75_79": 68,
            "age_80_84": 71,
            "age_85_plus": 74,
        },
        "defaults": {
            "Age_Average": 0.0,
            "Age_Median": 0.0,
            "householdIncome": 0.0,
            "householdIncome_AT": 0.0,
        },
    },
]


REGIONS = {
    "CSD": [
        "3521010",  # Brampton
        "3529006",  # Brantford
        "3530013",  # Kitchener
        "3530016",  # Waterloo
        "3519036",  # Markham
        "3519038",  # Richmond Hill
        "3519044",  # Whitchurch-Stouffville
        "3519046",  # Aurora
        "3519048",  # Newmarket
        "3519049",  # King
        "3519054",  # East Gwillimbury
        "3520005",  # Toronto
        "3521005",  # Mississauga
        "3519028",  # Vaughan
    ]
}


CUSTOM_LABELS = {
    "CA11": {
        "age_0_4": "0 to 4 years",
        "age_5_9": "5 to 9 years",
        "age_10_14": "10 to 14 years",
        "age_15_19": "15 to 19 years",
        "age_20_24": "20 to 24 years",
        "age_25_29": "25 to 29 years",
        "age_30_34": "30 to 34 years",
        "age_35_39": "35 to 39 years",
        "age_40_44": "40 to 44 years",
        "age_45_49": "45 to 49 years",
        "age_50_54": "50 to 54 years",
        "age_55_59": "55 to 59 years",
        "age_60_64": "60 to 64 years",
        "age_65_69": "65 to 69 years",
        "age_70_74": "70 to 74 years",
        "age_75_79": "75 to 79 years",
        "age_80_84": "80 to 84 years",
        "age_85_plus": "85 years and over",
    }
}


FIELD_DEFINITIONS = {
    "population": {
        "db_field": "population",
        "label_template": "Population",
        "type": "int",
    },
    "age_0_14": {
        "db_field": "Age_0-14",
        "label_template": "{vector}: 0 to 14 years",
        "type": "int",
    },
    "age_15_64": {
        "db_field": "Age_15-64",
        "label_template": "{vector}: 15 to 64 years",
        "type": "int",
    },
    "age_65": {
        "db_field": "Age_65",
        "label_template": "{vector}: 65 years and over",
        "type": "int",
    },
    "age_average": {
        "db_field": "Age_Average",
        "label_template": "{vector}: Average age",
        "type": "float",
    },
    "age_median": {
        "db_field": "Age_Median",
        "label_template": "{vector}: Median age",
        "type": "float",
    },
    "household_income": {
        "db_field": "householdIncome",
        "label_template": "{vector}: Median total income of households in 2015 ($)",
        "type": "float",
    },
    "household_income_at": {
        "db_field": "householdIncome_AT",
        "label_template": "{vector}: Median after-tax income of households in 2015 ($)",
        "type": "float",
    },
}


def safe_int(value) -> int:
    if value is None:
        return 0
    try:
        return int(float(value))
    except (ValueError, TypeError):
        return 0


def safe_float(value) -> float:
    if value is None:
        return 0.0
    try:
        return float(value)
    except (ValueError, TypeError):
        return 0.0


def convert_value(value, value_type):
    if value_type == "int":
        return safe_int(value)
    if value_type == "float":
        return safe_float(value)
    return value


def build_vector_name(config: dict, key: str) -> str:
    vector_id = config["vector_ids"][key]
    return f"{config['vector_prefix']}{vector_id}"


def build_vector_list(config: dict) -> list:
    return [
        build_vector_name(config, key)
        for key in config["vector_ids"]
    ]


def build_source_column(config: dict, key: str) -> str:
    vector_name = build_vector_name(config, key)

    if config["dataset"] in CUSTOM_LABELS and key in CUSTOM_LABELS[config["dataset"]]:
        return f"{vector_name}: {CUSTOM_LABELS[config['dataset']][key]}"

    field_definition = FIELD_DEFINITIONS[key]
    return field_definition["label_template"].format(vector=vector_name)


def build_row(config: dict, census_row) -> dict:
    row = {
        "geo_uid": safe_int(census_row["GeoUID"]),
        "year": config["year"],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

    if config["dataset"] == "CA11":
        age_0_14 = (
            safe_int(census_row.get(build_source_column(config, "age_0_4")))
            + safe_int(census_row.get(build_source_column(config, "age_5_9")))
            + safe_int(census_row.get(build_source_column(config, "age_10_14")))
        )

        age_15_64 = (
            safe_int(census_row.get(build_source_column(config, "age_15_19")))
            + safe_int(census_row.get(build_source_column(config, "age_20_24")))
            + safe_int(census_row.get(build_source_column(config, "age_25_29")))
            + safe_int(census_row.get(build_source_column(config, "age_30_34")))
            + safe_int(census_row.get(build_source_column(config, "age_35_39")))
            + safe_int(census_row.get(build_source_column(config, "age_40_44")))
            + safe_int(census_row.get(build_source_column(config, "age_45_49")))
            + safe_int(census_row.get(build_source_column(config, "age_50_54")))
            + safe_int(census_row.get(build_source_column(config, "age_55_59")))
            + safe_int(census_row.get(build_source_column(config, "age_60_64")))
        )

        age_65_plus = (
            safe_int(census_row.get(build_source_column(config, "age_65_69")))
            + safe_int(census_row.get(build_source_column(config, "age_70_74")))
            + safe_int(census_row.get(build_source_column(config, "age_75_79")))
            + safe_int(census_row.get(build_source_column(config, "age_80_84")))
            + safe_int(census_row.get(build_source_column(config, "age_85_plus")))
        )

        row["population"] = age_0_14 + age_15_64 + age_65_plus
        row["Age_0-14"] = age_0_14
        row["Age_15-64"] = age_15_64
        row["Age_65"] = age_65_plus

    else:
        for key, field_definition in FIELD_DEFINITIONS.items():
            if key not in config["vector_ids"]:
                continue

            db_field = field_definition["db_field"]
            source_column = build_source_column(config, key)
            value_type = field_definition["type"]

            row[db_field] = convert_value(
                census_row.get(source_column),
                value_type,
            )

    for db_field, default_value in config.get("defaults", {}).items():
        row[db_field] = default_value

    return row


def main() -> None:
    load_dotenv(".env.local")
    supabase_url = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
    supabase_secret_key = os.environ["SUPABASE_SECRET_KEY"]
    census_api_key = os.environ["CENSUS_API_KEY"]

    supabase: Client = create_client(supabase_url, supabase_secret_key)

    for config in YEAR_CONFIGS:
        vectors = build_vector_list(config)

        print(f"\n--- Syncing dataset {config['dataset']} ({config['year']}) ---")
        print(f"Vectors requested: {vectors}")

        census_df = get_census(
            dataset=config["dataset"],
            regions=REGIONS,
            vectors=vectors,
            level="CSD",
            labels="detailed",
            geo_format=None,
            api_key=census_api_key,
        )

        print(census_df.columns.tolist())
        print(census_df.iloc[0].to_dict())

        for _, census_row in census_df.iterrows():
            row = build_row(config, census_row)

            result = (
                supabase.table("fact_demographics")
                .upsert(row, on_conflict="geo_uid,year")
                .execute()
            )

            print(
                f"Upserted geo_uid={row['geo_uid']} year={row['year']} population={row.get('population', 0)}"
            )
            print(result)


if __name__ == "__main__":
    main()


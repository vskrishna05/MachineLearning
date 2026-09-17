import os
import json
import joblib
import pandas as pd

BASE_DIR = os.path.join(os.path.dirname(__file__), "models")

formats = {
    "TEST": "test",
    "ODI": "odi",
    "T20": "t20",
    "IPL": "ipl"
}

for name, folder in formats.items():

    print("\n" + "=" * 60)
    print(f"{name} MODEL")
    print("=" * 60)

    model_dir = os.path.join(BASE_DIR, folder)

    if not os.path.exists(model_dir):
        print("Folder not found:", model_dir)
        continue

    print("\nFiles:")
    for file in sorted(os.listdir(model_dir)):
        print(" -", file)

    # Inspect PKL files
    for file in sorted(os.listdir(model_dir)):
        if file.endswith(".pkl"):
            path = os.path.join(model_dir, file)

            try:
                obj = joblib.load(path)

                print(f"\nPKL: {file}")
                print("Type:", type(obj))

                if hasattr(obj, "classes_"):
                    print("Classes:", obj.classes_)

                if hasattr(obj, "n_features_in_"):
                    print("Number of features:", obj.n_features_in_)

                if hasattr(obj, "feature_names_in_"):
                    print("Feature names:", list(obj.feature_names_in_))

                if isinstance(obj, list):
                    print("List length:", len(obj))
                    print("First items:", obj[:10])

                if isinstance(obj, dict):
                    print("Dictionary keys:", list(obj.keys())[:30])

            except Exception as e:
                print("Error loading:", file)
                print(e)

    # Inspect JSON files
    for file in sorted(os.listdir(model_dir)):
        if file.endswith(".json"):
            path = os.path.join(model_dir, file)

            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)

                print(f"\nJSON: {file}")
                print(json.dumps(data, indent=2)[:5000])

            except Exception as e:
                print("Error reading:", file)
                print(e)

    # Inspect CSV files
    for file in sorted(os.listdir(model_dir)):
        if file.endswith(".csv"):
            path = os.path.join(model_dir, file)

            try:
                df = pd.read_csv(path)

                print(f"\nCSV: {file}")
                print("Shape:", df.shape)
                print("Columns:", list(df.columns))

                print("First 3 rows:")
                print(df.head(3).to_string(index=False))

            except Exception as e:
                print("Error reading:", file)
                print(e)

print("\n" + "=" * 60)
print("MODEL INSPECTION COMPLETED")
print("=" * 60)
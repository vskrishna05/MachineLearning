import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

formats = {
    "TEST": ("test", "test_match_data_for_prediction.csv"),
    "ODI": ("odi", "odi_match_data_for_prediction.csv"),
    "T20": ("t20", "t20_match_data_for_prediction.csv"),
    "IPL": ("ipl", "ipl_match_data_for_prediction.csv"),
}

for name, (folder, filename) in formats.items():

    print("\n" + "=" * 70)
    print(name)
    print("=" * 70)

    path = os.path.join(MODELS_DIR, folder, filename)

    if not os.path.exists(path):
        print("FILE NOT FOUND:", path)
        continue

    df = pd.read_csv(path)

    print("\nShape:")
    print(df.shape)

    print("\nColumns:")
    for column in df.columns:
        print(" -", column)

    print("\nFirst 5 rows:")
    print(df.head().to_string(index=False))

    print("\nData types:")
    print(df.dtypes.to_string())

# --------------------------------------------------
# T20 prediction engine
# --------------------------------------------------

print("\n" + "=" * 70)
print("T20 PREDICTION ENGINE")
print("=" * 70)

engine_path = os.path.join(
    MODELS_DIR,
    "t20",
    "t20_prediction_engine.py"
)

if os.path.exists(engine_path):

    with open(engine_path, "r", encoding="utf-8") as f:
        engine_code = f.read()

    print("\nFunctions found:")

    for line in engine_code.splitlines():
        stripped = line.strip()

        if stripped.startswith("def "):
            print(stripped)

    print("\nEngine code:")
    print(engine_code)

else:
    print("T20 prediction engine not found.")

print("\n" + "=" * 70)
print("PREDICTION DETAILS COMPLETED")
print("=" * 70)
import os
import joblib
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

configs = {
    "TEST": {
        "folder": "test",
        "model": "test_match_outcome_model.pkl",
        "features": "test_model_features.pkl",
        "info": "test_model_info.json"
    },
    "ODI": {
        "folder": "odi",
        "model": "odi_match_outcome_model.pkl",
        "features": "odi_model_features.pkl",
        "info": "odi_model_info.json"
    },
    "T20": {
        "folder": "t20",
        "model": "t20_final_match_outcome_model.pkl",
        "features": "t20_final_model_features.pkl",
        "info": "t20_final_model_info.json"
    },
    "IPL": {
        "folder": "ipl",
        "model": "ipl_match_outcome_model.pkl",
        "features": "ipl_model_features.pkl",
        "info": "ipl_model_info.json"
    }
}

for format_name, config in configs.items():

    print("\n" + "=" * 70)
    print(format_name)
    print("=" * 70)

    folder = os.path.join(MODELS_DIR, config["folder"])

    # Model
    model_path = os.path.join(folder, config["model"])
    model = joblib.load(model_path)

    print("\nMODEL TYPE:")
    print(type(model))

    if hasattr(model, "classes_"):
        print("CLASSES:")
        print(model.classes_)

    if hasattr(model, "n_features_in_"):
        print("NUMBER OF FEATURES:")
        print(model.n_features_in_)

    if hasattr(model, "feature_names_in_"):
        print("MODEL FEATURE NAMES:")
        print(list(model.feature_names_in_))

    # Features
    feature_path = os.path.join(folder, config["features"])
    features = joblib.load(feature_path)

    print("\nSAVED FEATURES:")
    print(features)

    print("\nFEATURE TYPE:")
    print(type(features))

    # Model info
    info_path = os.path.join(folder, config["info"])

    if os.path.exists(info_path):
        with open(info_path, "r", encoding="utf-8") as f:
            info = json.load(f)

        print("\nMODEL INFO:")
        print(json.dumps(info, indent=2))

print("\n" + "=" * 70)
print("DETAILS COMPLETED")
print("=" * 70)
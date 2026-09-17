import os
import json
import joblib
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")


# ============================================================
# HELPERS
# ============================================================

def load_pickle(path):
    return joblib.load(path)


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_name(name):
    return str(name).strip()


def safe_rate(wins, matches):
    if matches and matches > 0:
        return wins / matches
    return 0.5


def first_existing(row, names, default=0.0):
    """
    Return the first available column value.
    """
    for name in names:
        if name in row.index:
            value = row.get(name)
            if pd.notna(value):
                try:
                    return float(value)
                except Exception:
                    pass

    return float(default)


def load_package(folder, model_file, feature_file, data_file):
    directory = os.path.join(MODELS_DIR, folder)

    model = load_pickle(os.path.join(directory, model_file))
    features = load_pickle(os.path.join(directory, feature_file))
    data = pd.read_csv(os.path.join(directory, data_file))

    return model, features, data


# ============================================================
# LOAD MODELS
# ============================================================

# TEST
test_model, test_features, test_data = load_package(
    "test",
    "test_match_outcome_model.pkl",
    "test_model_features.pkl",
    "test_match_data_for_prediction.csv"
)


# ODI
odi_model, odi_features, odi_data = load_package(
    "odi",
    "odi_match_outcome_model.pkl",
    "odi_model_features.pkl",
    "odi_match_data_for_prediction.csv"
)


# T20
t20_model, t20_features, t20_data = load_package(
    "t20",
    "t20_final_match_outcome_model.pkl",
    "t20_final_model_features.pkl",
    "t20_match_data_for_prediction.csv"
)


# IPL
ipl_model, ipl_features, ipl_data = load_package(
    "ipl",
    "ipl_match_outcome_model.pkl",
    "ipl_model_features.pkl",
    "ipl_match_data_for_prediction.csv"
)


# ============================================================
# OPTIONAL SUPPORTING DATA
# ============================================================

def try_load_csv(folder, filename):
    path = os.path.join(MODELS_DIR, folder, filename)

    if os.path.exists(path):
        return pd.read_csv(path)

    return None


# IPL supporting data
ipl_team_stats = try_load_csv("ipl", "ipl_team_stats.csv")
ipl_venue_stats = try_load_csv("ipl", "ipl_venue_stats.csv")
ipl_h2h_stats = try_load_csv("ipl", "ipl_h2h_stats.csv")
ipl_elo_ratings = try_load_csv("ipl", "ipl_elo_ratings.csv")


# TEST supporting data
test_team_stats = try_load_csv("test", "test_team_stats.csv")
test_venue_stats = try_load_csv("test", "test_venue_stats.csv")
test_h2h_data = try_load_csv("test", "test_h2h_data.csv")
test_elo_ratings = try_load_csv("test", "test_elo_ratings.csv")


# ODI supporting data
odi_venue_stats = try_load_csv("odi", "odi_venue_stats.csv")


# ============================================================
# T20 SUPPORTING DATA
# ============================================================

def try_load_pickle(folder, filename):
    path = os.path.join(MODELS_DIR, folder, filename)

    if os.path.exists(path):
        return load_pickle(path)

    return None


t20_team_stats = try_load_pickle(
    "t20",
    "t20_team_stats.pkl"
)

t20_elo_ratings = try_load_pickle(
    "t20",
    "t20_elo_ratings.pkl"
)

t20_h2h_stats = try_load_pickle(
    "t20",
    "t20_h2h_stats.pkl"
)

t20_venue_history = try_load_pickle(
    "t20",
    "t20_venue_history.pkl"
)


# ============================================================
# TEAM SNAPSHOT FROM HISTORICAL DATA
# ============================================================

def get_team_snapshot(df, team):
    """
    Get the latest available PRE-MATCH style team statistics.

    Important:
    We prefer average run-rate columns over match-level
    run-rate columns.
    """

    team = normalize_name(team)

    if "team_1" not in df.columns or "team_2" not in df.columns:
        return {
            "win_rate": 0.5,
            "recent_form": 0.5,
            "avg_runs": 0.0,
            "avg_wickets": 0.0,
            "run_rate": 0.0,
            "elo": 1500.0
        }

    rows = df[
        (df["team_1"].astype(str) == team) |
        (df["team_2"].astype(str) == team)
    ].copy()

    if rows.empty:
        return {
            "win_rate": 0.5,
            "recent_form": 0.5,
            "avg_runs": 0.0,
            "avg_wickets": 0.0,
            "run_rate": 0.0,
            "elo": 1500.0
        }

    if "date" in rows.columns:
        rows = rows.sort_values("date")

    latest = rows.iloc[-1]

    if str(latest["team_1"]) == team:

        return {
            "win_rate": first_existing(
                latest,
                [
                    "team_1_win_rate",
                    "team1_win_rate"
                ],
                0.5
            ),

            "recent_form": first_existing(
                latest,
                [
                    "team_1_recent_form",
                    "team1_recent_form"
                ],
                0.5
            ),

            "avg_runs": first_existing(
                latest,
                [
                    "team_1_avg_runs",
                    "team1_avg_runs"
                ],
                0.0
            ),

            "avg_wickets": first_existing(
                latest,
                [
                    "team_1_avg_wickets",
                    "team1_avg_wickets"
                ],
                0.0
            ),

            # IMPORTANT:
            # Prefer historical average run rate.
            "run_rate": first_existing(
                latest,
                [
                    "team_1_avg_run_rate",
                    "team1_avg_run_rate"
                ],
                0.0
            ),

            "elo": first_existing(
                latest,
                [
                    "team_1_elo",
                    "team1_elo"
                ],
                1500.0
            )
        }

    return {
        "win_rate": first_existing(
            latest,
            [
                "team_2_win_rate",
                "team2_win_rate"
            ],
            0.5
        ),

        "recent_form": first_existing(
            latest,
            [
                "team_2_recent_form",
                "team2_recent_form"
            ],
            0.5
        ),

        "avg_runs": first_existing(
            latest,
            [
                "team_2_avg_runs",
                "team2_avg_runs"
            ],
            0.0
        ),

        "avg_wickets": first_existing(
            latest,
            [
                "team_2_avg_wickets",
                "team2_avg_wickets"
            ],
            0.0
        ),

        "run_rate": first_existing(
            latest,
            [
                "team_2_avg_run_rate",
                "team2_avg_run_rate"
            ],
            0.0
        ),

        "elo": first_existing(
            latest,
            [
                "team_2_elo",
                "team2_elo"
            ],
            1500.0
        )
    }


# ============================================================
# H2H
# ============================================================

def get_h2h_rate(df, team1, team2, test_format=False):

    team1 = normalize_name(team1)
    team2 = normalize_name(team2)

    if "team_1" not in df.columns or "team_2" not in df.columns:
        return 0.5

    rows = df[
        (
            (df["team_1"].astype(str) == team1) &
            (df["team_2"].astype(str) == team2)
        )
        |
        (
            (df["team_1"].astype(str) == team2) &
            (df["team_2"].astype(str) == team1)
        )
    ].copy()

    if rows.empty:
        return 0.5

    team1_wins = 0.0
    total = 0.0

    for _, row in rows.iterrows():

        target = row.get("target")

        if pd.isna(target):
            continue

        target = int(target)
        total += 1

        if test_format:

            # TEST:
            # 0 = Team 1
            # 1 = Team 2
            # 2 = Draw

            if str(row["team_1"]) == team1 and target == 0:
                team1_wins += 1

            elif str(row["team_1"]) == team2 and target == 1:
                team1_wins += 1

        else:

            # ODI / T20 / IPL:
            # 0 = Team 2
            # 1 = Team 1

            if str(row["team_1"]) == team1 and target == 1:
                team1_wins += 1

            elif str(row["team_1"]) == team2 and target == 0:
                team1_wins += 1

    if total == 0:
        return 0.5

    return team1_wins / total


# ============================================================
# VENUE
# ============================================================

def get_venue_difference(
    df,
    team1,
    team2,
    venue,
    test_format=False
):

    team1 = normalize_name(team1)
    team2 = normalize_name(team2)
    venue = normalize_name(venue)

    if "venue" not in df.columns:
        return 0.0

    rows = df[
        df["venue"].astype(str).str.strip() == venue
    ].copy()

    if rows.empty:
        return 0.0

    def team_venue_rate(team):

        matches = rows[
            (rows["team_1"].astype(str) == team) |
            (rows["team_2"].astype(str) == team)
        ]

        if matches.empty:
            return 0.5

        wins = 0
        valid = 0

        for _, row in matches.iterrows():

            target = row.get("target")

            if pd.isna(target):
                continue

            target = int(target)
            valid += 1

            if str(row["team_1"]) == team:

                if test_format:
                    if target == 0:
                        wins += 1
                else:
                    if target == 1:
                        wins += 1

            else:

                if test_format:
                    if target == 1:
                        wins += 1
                else:
                    if target == 0:
                        wins += 1

        if valid == 0:
            return 0.5

        return wins / valid

    return (
        team_venue_rate(team1)
        -
        team_venue_rate(team2)
    )


# ============================================================
# TOSS
# ============================================================

def get_toss_features(
    team1,
    team2,
    toss_winner,
    toss_decision
):

    if not toss_winner:
        return 0, 0

    toss_winner = normalize_name(toss_winner)

    decision = str(toss_decision or "").lower()

    if toss_winner == team1:

        toss_diff = 1

        if decision == "bat":
            bat_first_diff = 1
        elif decision == "field":
            bat_first_diff = -1
        else:
            bat_first_diff = 0

    elif toss_winner == team2:

        toss_diff = -1

        if decision == "bat":
            bat_first_diff = -1
        elif decision == "field":
            bat_first_diff = 1
        else:
            bat_first_diff = 0

    else:

        toss_diff = 0
        bat_first_diff = 0

    return toss_diff, bat_first_diff


# ============================================================
# T20 OFFICIAL SAVED ENGINE FEATURES
# ============================================================

def build_t20_features(
    team1,
    team2,
    venue,
    toss_winner=None,
    toss_decision=None
):

    # If the saved T20 supporting objects exist,
    # reproduce the official saved T20 engine logic.

    if (
        t20_team_stats is not None
        and t20_elo_ratings is not None
        and t20_h2h_stats is not None
        and t20_venue_history is not None
    ):

        s1 = t20_team_stats.get(team1, {})
        s2 = t20_team_stats.get(team2, {})

        win_rate_diff = (
            s1.get("wins", 0)
            /
            max(s1.get("matches", 1), 1)
            -
            s2.get("wins", 0)
            /
            max(s2.get("matches", 1), 1)
        )

        recent_form_diff = (
            s1.get("recent_form", 0)
            -
            s2.get("recent_form", 0)
        )

        avg_runs_diff = (
            s1.get("avg_runs", 0)
            -
            s2.get("avg_runs", 0)
        )

        avg_wickets_diff = (
            s1.get("avg_wickets", 0)
            -
            s2.get("avg_wickets", 0)
        )

        run_rate_diff = (
            s1.get("run_rate", 0)
            -
            s2.get("run_rate", 0)
        )

        elo_diff = (
            t20_elo_ratings.get(team1, 1500)
            -
            t20_elo_ratings.get(team2, 1500)
        )

        h2h = t20_h2h_stats.get(
            (team1, team2),
            {}
        )

        h2h_rate = h2h.get(
            "team1_win_rate",
            0.5
        )

        v1 = t20_venue_history.get(
            (team1, venue),
            {"matches": 0, "wins": 0}
        )

        v2 = t20_venue_history.get(
            (team2, venue),
            {"matches": 0, "wins": 0}
        )

        venue_rate1 = (
            v1["wins"] / v1["matches"]
            if v1["matches"] > 0
            else 0.5
        )

        venue_rate2 = (
            v2["wins"] / v2["matches"]
            if v2["matches"] > 0
            else 0.5
        )

        venue_win_rate_diff = (
            venue_rate1 - venue_rate2
        )

        toss_diff, bat_first_diff = get_toss_features(
            team1,
            team2,
            toss_winner,
            toss_decision
        )

        return {
            "elo_diff": float(elo_diff),
            "win_rate_diff": float(win_rate_diff),
            "recent_form_diff": float(recent_form_diff),
            "avg_runs_diff": float(avg_runs_diff),
            "avg_wickets_diff": float(avg_wickets_diff),
            "run_rate_diff": float(run_rate_diff),
            "team_1_h2h_win_rate": float(h2h_rate),
            "venue_win_rate_diff": float(venue_win_rate_diff),
            "toss_winner_diff": int(toss_diff),
            "bat_first_diff": int(bat_first_diff)
        }

    # Fallback
    return build_generic_features(
        t20_data,
        team1,
        team2,
        venue,
        toss_winner,
        toss_decision,
        False
    )


# ============================================================
# GENERIC FEATURE BUILDER
# ============================================================

def build_generic_features(
    df,
    team1,
    team2,
    venue,
    toss_winner=None,
    toss_decision=None,
    test_format=False
):

    s1 = get_team_snapshot(df, team1)
    s2 = get_team_snapshot(df, team2)

    h2h_rate = get_h2h_rate(
        df,
        team1,
        team2,
        test_format=test_format
    )

    venue_diff = get_venue_difference(
        df,
        team1,
        team2,
        venue,
        test_format=test_format
    )

    toss_diff, bat_first_diff = get_toss_features(
        team1,
        team2,
        toss_winner,
        toss_decision
    )

    return {

        "elo_diff":
            s1["elo"] - s2["elo"],

        "win_rate_diff":
            s1["win_rate"] - s2["win_rate"],

        "recent_form_diff":
            s1["recent_form"] - s2["recent_form"],

        "avg_runs_diff":
            s1["avg_runs"] - s2["avg_runs"],

        "avg_wickets_diff":
            s1["avg_wickets"] - s2["avg_wickets"],

        "run_rate_diff":
            s1["run_rate"] - s2["run_rate"],

        "team1_h2h_points_rate":
            h2h_rate,

        "team_1_h2h_win_rate":
            h2h_rate,

        "venue_win_rate_diff":
            venue_diff,

        "toss_winner_diff":
            toss_diff,

        "bat_first_diff":
            bat_first_diff
    }


# ============================================================
# FACTOR ANALYSIS
# ============================================================

def build_factor_analysis(
    values,
    team1,
    team2,
    venue,
    toss_winner=None,
    toss_decision=None
):

    factors = []

    def add_difference_factor(
        factor,
        key,
        explanation1,
        explanation2,
        decimals=4
    ):

        value = float(values.get(key, 0))

        if value > 0:

            factors.append({
                "factor": factor,
                "advantage": team1,
                "difference": round(abs(value), decimals),
                "explanation": explanation1
            })

        elif value < 0:

            factors.append({
                "factor": factor,
                "advantage": team2,
                "difference": round(abs(value), decimals),
                "explanation": explanation2
            })

        else:

            factors.append({
                "factor": factor,
                "advantage": "Even",
                "difference": 0,
                "explanation":
                    "Both teams have an equal historical indicator."
            })


    # Recent Form
    add_difference_factor(
        "Recent Form",
        "recent_form_diff",
        f"{team1} has the stronger recent-form indicator.",
        f"{team2} has the stronger recent-form indicator."
    )


    # Overall Win Rate
    add_difference_factor(
        "Overall Win Rate",
        "win_rate_diff",
        f"{team1} has the higher historical win-rate indicator.",
        f"{team2} has the higher historical win-rate indicator."
    )


    # Batting
    add_difference_factor(
        "Batting Performance",
        "avg_runs_diff",
        f"{team1} has the higher average-runs indicator.",
        f"{team2} has the higher average-runs indicator.",
        2
    )


    # Bowling
    add_difference_factor(
        "Bowling Performance",
        "avg_wickets_diff",
        f"{team1} has the higher average-wickets indicator.",
        f"{team2} has the higher average-wickets indicator.",
        2
    )


    # Run Rate
    add_difference_factor(
        "Run Rate",
        "run_rate_diff",
        f"{team1} has the higher historical run-rate indicator.",
        f"{team2} has the higher historical run-rate indicator.",
        3
    )


    # H2H
    h2h = float(
        values.get(
            "team_1_h2h_win_rate",
            values.get(
                "team1_h2h_points_rate",
                0.5
            )
        )
    )

    if h2h > 0.5:

        factors.append({
            "factor": "Head-to-Head",
            "advantage": team1,
            "difference": round(abs(h2h - 0.5), 4),
            "explanation":
                f"{team1} has the stronger historical "
                f"head-to-head indicator."
        })

    elif h2h < 0.5:

        factors.append({
            "factor": "Head-to-Head",
            "advantage": team2,
            "difference": round(abs(h2h - 0.5), 4),
            "explanation":
                f"{team2} has the stronger historical "
                f"head-to-head indicator."
        })

    else:

        factors.append({
            "factor": "Head-to-Head",
            "advantage": "Even",
            "difference": 0,
            "explanation":
                "The historical head-to-head indicator is even."
        })


    # Venue
    venue_diff = float(
        values.get(
            "venue_win_rate_diff",
            0
        )
    )

    if venue_diff > 0:

        factors.append({
            "factor": "Venue Performance",
            "advantage": team1,
            "difference": round(abs(venue_diff), 4),
            "explanation":
                f"{team1} has the stronger historical "
                f"venue-performance indicator at {venue}."
        })

    elif venue_diff < 0:

        factors.append({
            "factor": "Venue Performance",
            "advantage": team2,
            "difference": round(abs(venue_diff), 4),
            "explanation":
                f"{team2} has the stronger historical "
                f"venue-performance indicator at {venue}."
        })

    else:

        factors.append({
            "factor": "Venue Performance",
            "advantage": "Even",
            "difference": 0,
            "explanation":
                f"The venue-performance indicators are even at {venue}."
        })


    # Toss
    if toss_winner:

        if toss_winner == team1:
            toss_advantage = team1

        elif toss_winner == team2:
            toss_advantage = team2

        else:
            toss_advantage = "Unknown"

        decision = toss_decision or "not specified"

        factors.append({
            "factor": "Toss",
            "advantage": toss_advantage,
            "difference":
                abs(
                    float(
                        values.get(
                            "toss_winner_diff",
                            0
                        )
                    )
                ),
            "explanation":
                f"{toss_winner} won the toss and chose to {decision}."
        })


    return factors


# ============================================================
# COMMON PREDICTION
# ============================================================

def predict_common(
    model,
    features,
    df,
    team1,
    team2,
    venue,
    pitch_type="Balanced",
    toss_winner=None,
    toss_decision=None,
    test_format=False
):

    team1 = normalize_name(team1)
    team2 = normalize_name(team2)
    venue = normalize_name(venue)

    if team1 == team2:
        raise ValueError(
            "Team 1 and Team 2 must be different."
        )


    values = build_generic_features(
        df,
        team1,
        team2,
        venue,
        toss_winner,
        toss_decision,
        test_format
    )


    row = pd.DataFrame([values])

    # EXACT saved model feature order
    row = row[list(features)]


    probabilities = model.predict_proba(row)[0]

    classes = list(model.classes_)

    probability_map = {
        int(cls): float(prob)
        for cls, prob in zip(
            classes,
            probabilities
        )
    }


    # ========================================================
    # TEST
    # ========================================================

    if test_format:

        team1_probability = (
            probability_map.get(0, 0.0)
            * 100
        )

        team2_probability = (
            probability_map.get(1, 0.0)
            * 100
        )

        draw_probability = (
            probability_map.get(2, 0.0)
            * 100
        )

        prediction_class = max(
            probability_map,
            key=probability_map.get
        )

        if prediction_class == 0:
            prediction = team1

        elif prediction_class == 1:
            prediction = team2

        else:
            prediction = "Draw"


        return {

            "team_1": team1,
            "team_2": team2,
            "venue": venue,
            "pitch_type": pitch_type,
            "toss_winner": toss_winner,
            "toss_decision": toss_decision,

            "prediction": prediction,

            "team_1_win_probability":
                round(team1_probability, 2),

            "team_2_win_probability":
                round(team2_probability, 2),

            "draw_probability":
                round(draw_probability, 2),

            "model_features": {
                key: round(float(value), 6)
                for key, value in values.items()
                if key in list(features)
            },

            "prediction_factors":
                build_factor_analysis(
                    values,
                    team1,
                    team2,
                    venue,
                    toss_winner,
                    toss_decision
                )
        }


    # ========================================================
    # ODI / T20 / IPL
    # ========================================================

    team1_probability = (
        probability_map.get(1, 0.0)
        * 100
    )

    team2_probability = (
        probability_map.get(0, 0.0)
        * 100
    )


    prediction = (
        team1
        if team1_probability >= team2_probability
        else team2
    )


    return {

        "team_1": team1,
        "team_2": team2,

        "venue": venue,

        "pitch_type": pitch_type,

        "toss_winner": toss_winner,

        "toss_decision": toss_decision,

        "prediction": prediction,

        "team_1_win_probability":
            round(team1_probability, 2),

        "team_2_win_probability":
            round(team2_probability, 2),

        "model_features": {
            key: round(float(value), 6)
            for key, value in values.items()
            if key in list(features)
        },

        "prediction_factors":
            build_factor_analysis(
                values,
                team1,
                team2,
                venue,
                toss_winner,
                toss_decision
            )
    }


# ============================================================
# PUBLIC PREDICTION FUNCTIONS
# ============================================================

def predict_test(
    team1,
    team2,
    venue,
    pitch_type="Balanced",
    toss_winner=None,
    toss_decision=None
):

    return predict_common(
        test_model,
        test_features,
        test_data,
        team1,
        team2,
        venue,
        pitch_type,
        toss_winner,
        toss_decision,
        test_format=True
    )


def predict_odi(
    team1,
    team2,
    venue,
    pitch_type="Balanced",
    toss_winner=None,
    toss_decision=None
):

    return predict_common(
        odi_model,
        odi_features,
        odi_data,
        team1,
        team2,
        venue,
        pitch_type,
        toss_winner,
        toss_decision
    )


def predict_t20(
    team1,
    team2,
    venue,
    pitch_type="Balanced",
    toss_winner=None,
    toss_decision=None
):

    # Use the dedicated saved T20 engine features.
    values = build_t20_features(
        team1,
        team2,
        venue,
        toss_winner,
        toss_decision
    )

    row = pd.DataFrame([values])

    row = row[list(t20_features)]

    probabilities = t20_model.predict_proba(row)[0]

    classes = list(t20_model.classes_)

    probability_map = {
        int(cls): float(prob)
        for cls, prob in zip(
            classes,
            probabilities
        )
    }

    team1_probability = (
        probability_map.get(1, 0.0)
        * 100
    )

    team2_probability = (
        probability_map.get(0, 0.0)
        * 100
    )

    prediction = (
        team1
        if team1_probability >= team2_probability
        else team2
    )

    return {

        "team_1": normalize_name(team1),
        "team_2": normalize_name(team2),

        "venue": normalize_name(venue),

        "pitch_type": pitch_type,

        "toss_winner": toss_winner,

        "toss_decision": toss_decision,

        "prediction": prediction,

        "team_1_win_probability":
            round(team1_probability, 2),

        "team_2_win_probability":
            round(team2_probability, 2),

        "model_features": {
            key: round(float(value), 6)
            for key, value in values.items()
            if key in list(t20_features)
        },

        "prediction_factors":
            build_factor_analysis(
                values,
                normalize_name(team1),
                normalize_name(team2),
                normalize_name(venue),
                toss_winner,
                toss_decision
            )
    }


def predict_ipl(
    team1,
    team2,
    venue,
    pitch_type="Balanced",
    toss_winner=None,
    toss_decision=None
):

    return predict_common(
        ipl_model,
        ipl_features,
        ipl_data,
        team1,
        team2,
        venue,
        pitch_type,
        toss_winner,
        toss_decision
    )


# ============================================================
# STARTUP MESSAGE
# ============================================================

print("==============================================")
print("CricVision Prediction Engine")
print("==============================================")
print("TEST model loaded")
print("ODI model loaded")
print("T20 model loaded")
print("IPL model loaded")
print("Prediction engine loaded successfully.")
print("==============================================")
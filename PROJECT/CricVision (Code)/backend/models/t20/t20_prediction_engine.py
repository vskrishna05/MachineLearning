
import pickle
import pandas as pd

with open("t20_final_match_outcome_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("t20_final_model_features.pkl", "rb") as f:
    features = pickle.load(f)

with open("t20_team_stats.pkl", "rb") as f:
    current_stats = pickle.load(f)

with open("t20_elo_ratings.pkl", "rb") as f:
    final_elo = pickle.load(f)

with open("t20_h2h_stats.pkl", "rb") as f:
    h2h_stats = pickle.load(f)

with open("t20_venue_history.pkl", "rb") as f:
    venue_history = pickle.load(f)


def predict_t20(team1, team2, venue,
                pitch_type="Balanced",
                toss_winner=None,
                toss_decision=None):

    s1 = current_stats.get(team1, {})
    s2 = current_stats.get(team2, {})

    win_rate_diff = (
        s1.get("wins", 0) / max(s1.get("matches", 1), 1)
        - s2.get("wins", 0) / max(s2.get("matches", 1), 1)
    )

    recent_form_diff = (
        s1.get("recent_form", 0)
        - s2.get("recent_form", 0)
    )

    avg_runs_diff = (
        s1.get("avg_runs", 0)
        - s2.get("avg_runs", 0)
    )

    avg_wickets_diff = (
        s1.get("avg_wickets", 0)
        - s2.get("avg_wickets", 0)
    )

    run_rate_diff = (
        s1.get("run_rate", 0)
        - s2.get("run_rate", 0)
    )

    elo_diff = (
        final_elo.get(team1, 1500)
        - final_elo.get(team2, 1500)
    )

    h2h = h2h_stats.get((team1, team2), {})
    h2h_rate = h2h.get("team1_win_rate", 0.5)

    v1 = venue_history.get(
        (team1, venue),
        {"matches": 0, "wins": 0}
    )

    v2 = venue_history.get(
        (team2, venue),
        {"matches": 0, "wins": 0}
    )

    venue_rate1 = (
        v1["wins"] / v1["matches"]
        if v1["matches"] > 0 else 0.5
    )

    venue_rate2 = (
        v2["wins"] / v2["matches"]
        if v2["matches"] > 0 else 0.5
    )

    venue_win_rate_diff = venue_rate1 - venue_rate2

    if toss_winner == team1:
        toss_winner_diff = 1
    elif toss_winner == team2:
        toss_winner_diff = -1
    else:
        toss_winner_diff = 0

    if toss_winner == team1:
        bat_first_diff = (
            1 if str(toss_decision).lower() == "bat"
            else -1
        )
    elif toss_winner == team2:
        bat_first_diff = (
            -1 if str(toss_decision).lower() == "bat"
            else 1
        )
    else:
        bat_first_diff = 0

    data = pd.DataFrame([{
        "elo_diff": elo_diff,
        "win_rate_diff": win_rate_diff,
        "recent_form_diff": recent_form_diff,
        "avg_runs_diff": avg_runs_diff,
        "avg_wickets_diff": avg_wickets_diff,
        "run_rate_diff": run_rate_diff,
        "team_1_h2h_win_rate": h2h_rate,
        "venue_win_rate_diff": venue_win_rate_diff,
        "toss_winner_diff": toss_winner_diff,
        "bat_first_diff": bat_first_diff
    }])[features]

    probabilities = model.predict_proba(data)[0]

    team1_probability = probabilities[1] * 100
    team2_probability = probabilities[0] * 100

    prediction = (
        team1 if probabilities[1] >= probabilities[0]
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
        "team_1_win_probability": round(team1_probability, 2),
        "team_2_win_probability": round(team2_probability, 2)
    }

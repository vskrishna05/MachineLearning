from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from prediction_engine import (
    predict_test,
    predict_odi,
    predict_t20,
    predict_ipl
)


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="CricVision API",
    description="Cricket Intelligence & Match Prediction",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ============================================================
# REQUEST MODEL
# ============================================================

class PredictionRequest(BaseModel):
    team1: str
    team2: str
    venue: str
    pitch_type: str = "Balanced"
    toss_winner: str | None = None
    toss_decision: str | None = None


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():
    return {
        "project": "CricVision",
        "tagline": "Cricket Intelligence & Match Prediction",
        "status": "Backend running",
        "formats": [
            "TEST",
            "ODI",
            "T20",
            "IPL"
        ]
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "prediction_engine": "loaded"
    }


# ============================================================
# TEST PREDICTION
# ============================================================

@app.post("/predict/test")
def test_prediction(request: PredictionRequest):

    try:
        result = predict_test(
            team1=request.team1,
            team2=request.team2,
            venue=request.venue,
            pitch_type=request.pitch_type,
            toss_winner=request.toss_winner,
            toss_decision=request.toss_decision
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ============================================================
# ODI PREDICTION
# ============================================================

@app.post("/predict/odi")
def odi_prediction(request: PredictionRequest):

    try:
        result = predict_odi(
            team1=request.team1,
            team2=request.team2,
            venue=request.venue,
            pitch_type=request.pitch_type,
            toss_winner=request.toss_winner,
            toss_decision=request.toss_decision
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ============================================================
# T20 PREDICTION
# ============================================================

@app.post("/predict/t20")
def t20_prediction(request: PredictionRequest):

    try:
        result = predict_t20(
            team1=request.team1,
            team2=request.team2,
            venue=request.venue,
            pitch_type=request.pitch_type,
            toss_winner=request.toss_winner,
            toss_decision=request.toss_decision
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# ============================================================
# IPL PREDICTION
# ============================================================

@app.post("/predict/ipl")
def ipl_prediction(request: PredictionRequest):

    try:
        result = predict_ipl(
            team1=request.team1,
            team2=request.team2,
            venue=request.venue,
            pitch_type=request.pitch_type,
            toss_winner=request.toss_winner,
            toss_decision=request.toss_decision
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
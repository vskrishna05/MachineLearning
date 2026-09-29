## Match Outcome Prediction Using Logistic Regression and Random Forest

CricVision is a machine learning-based cricket intelligence and match prediction web application that analyzes historical cricket match data and predicts the outcome of a cricket match.

The system supports four cricket formats:

- Test
- ODI
- T20
- IPL

This combines machine learning models with historical cricket statistics such as team performance, recent form, Elo ratings, batting and bowling performance, head-to-head records, venue history, and toss information.

The complete system is built with a React frontend, FastAPI backend, and trained machine learning models.

---

## About CricVision

Cricket match prediction involves analyzing multiple factors rather than depending on a single statistic.

CricVision was developed to transform historical cricket data into meaningful performance features and use those features with machine learning models to generate a pre-match prediction.

The application allows a user to select two teams, a venue, pitch type, and optional toss information. The selected information is sent to the backend, where the appropriate machine learning model processes the match data and returns the prediction.

The result is then displayed through the CricVision web interface.

CricVision is designed specifically for **pre-match prediction**. It does not perform live or in-match prediction.

---

## What Problem Does CricVision Solve?

Analyzing a cricket match manually requires considering many different factors:

- Team strength
- Recent performance
- Historical results
- Head-to-head performance
- Venue performance
- Batting performance
- Bowling performance
- Toss information
- Overall team rating

When these factors are analyzed manually, it can be difficult to combine them consistently.

CricVision addresses this problem by using historical cricket data and machine learning to analyze these factors systematically and provide a data-driven match outcome prediction.

Website Link to access: https://timer-wide-30218079.figma.site/

---

## How CricVision Works

The complete system follows this workflow:

```text
Historical Cricket Data
        |
        v
Data Cleaning & Processing
        |
        v
Feature Engineering
        |
        v
Machine Learning Model
        |
        v
Saved Trained Model
        |
        v
FastAPI Backend
        |
        v
React Frontend
        |
        v
User Selects Match Details
        |
        v
Prediction
        |
        v
Prediction Result & Analysis

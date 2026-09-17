Modify the CURRENT CricVision / MATCHAI Figma design. Do NOT redesign the entire website from scratch.

Keep the existing dark premium cricket analytics dashboard style, sidebar navigation, typography, cards, spacing, borders, grid background and overall visual identity where they already work well.

The goal is to turn the current IPL-focused dashboard into a complete:

CRICVISION
Cricket Intelligence & Match Prediction

platform supporting:

TEST
ODI
T20
IPL

==================================================
1. BRANDING
==================================================

Replace:

MATCHAI

with:

CricVision

Replace:

IPL INTELLIGENCE

with:

CRICKET INTELLIGENCE

Use the tagline where appropriate:

Cricket Intelligence & Match Prediction

Do not repeatedly show technical machine-learning terminology in the branding.

Remove unnecessary labels such as:

"AI ENGINE ONLINE"

from multiple places.

If a system-status indicator is retained, use a subtle:

SYSTEM ONLINE

instead.

==================================================
2. SIDEBAR NAVIGATION
==================================================

Keep the left sidebar structure, but update it to:

Overview
Match Predictor
Analytics
Team Intelligence
Prediction History
About Model

Do not add unnecessary pages.

The sidebar should remain visually similar to the existing design.

==================================================
3. OVERVIEW PAGE
==================================================

The current Overview page should become the main CricVision dashboard.

Hero section:

CRICVISION

"Cricket Intelligence & Match Prediction"

Description:

"Analyze cricket teams, venues and historical performance to understand match outcomes before the game begins."

Primary button:

PREDICT A MATCH →

Secondary button:

VIEW ANALYTICS →

Below the hero, show four format cards:

TEST
ODI
T20
IPL

Each card should contain:

- Format name
- Short description
- Predict button

Example descriptions:

TEST
"Three-outcome prediction with win and draw analysis."

ODI
"Pre-match outcome prediction using historical team and venue performance."

T20
"Pre-match prediction focused on recent form and performance trends."

IPL
"Pre-match prediction using franchise history, form and venue performance."

Do not show fake statistics on these cards.

==================================================
4. REMOVE UNNECESSARY ML CONTENT
==================================================

Remove from the Overview page:

- Logistic Regression labels
- Random Forest labels
- "AI Engine Online"
- Artificial-looking model status messages
- Random accuracy percentages
- Fake dataset counters
- Unnecessary ML terminology
- Technical model names from dashboard cards
- Decorative ML terminology that does not help the user

Do NOT display things such as:

"55.94% Logistic Regression"

"LR"

"AI ENGINE ONLINE"

unless they are specifically relevant to the About Model page.

The Overview should feel like a cricket intelligence product, not a machine-learning experiment.

==================================================
5. MATCH PREDICTOR PAGE
==================================================

Create a clean prediction interface.

Show format selector:

TEST | ODI | T20 | IPL

Inputs:

Team 1
Team 2
Venue
Pitch Type
Toss Winner
Toss Decision

Use dropdown/select components.

Pitch Type options:

Balanced
Batting Friendly
Bowling Friendly
Spin Friendly
Seam Friendly

Toss Winner:

Team 1
Team 2
Not Available

Toss Decision:

Bat
Field
Not Available

Primary button:

PREDICT MATCH

Clearly indicate:

"Pre-match prediction"

Do NOT include:

- Live score
- Ball-by-ball prediction
- Live win probability
- Fantasy prediction
- Betting information

==================================================
6. PREDICTION RESULT
==================================================

After the user clicks Predict Match, create a strong result screen.

Top section:

TEAM 1
vs
TEAM 2

Show:

Venue
Format
Pitch Type
Toss information

Main result card:

PREDICTED WINNER

[Winning Team]

Below it show probability visualization:

TEAM 1
XX%

TEAM 2
XX%

For TEST only:

DRAW
XX%

Do not show Draw for ODI, T20 or IPL.

==================================================
7. VERY IMPORTANT: "WHY THIS PREDICTION?"
==================================================

This is one of the most important changes.

Immediately below the predicted winner, add a section titled:

WHY THIS PREDICTION?

or:

WHY DOES CRICVISION PREDICT THIS TEAM?

The section must clearly explain the prediction in simple cricket language.

Show 4–6 key factors in individual cards.

Possible factors:

Recent Form
Overall Win Rate
Batting Performance
Bowling Performance
Run Rate
Head-to-Head Record
Venue Performance
Toss Impact

Each factor should show:

Factor name
Short explanation
Which team has the advantage

Example:

RECENT FORM
Team 1 has shown stronger recent results than Team 2.

TEAM 1 ADVANTAGE

Another example:

VENUE PERFORMANCE
Team 1 has historically performed better at this venue.

TEAM 1 ADVANTAGE

Another:

HEAD-TO-HEAD
Team 1 has a stronger historical record against Team 2.

TEAM 1 ADVANTAGE

Another:

BATTING PERFORMANCE
Team 1 has a higher historical average scoring performance.

TEAM 1 ADVANTAGE

Do not create random explanations.

The explanations must correspond to the actual features used by the prediction system.

If a factor does not provide a meaningful advantage, show:

NO CLEAR ADVANTAGE

Do not invent statistics.

==================================================
8. PREDICTION EXPLANATION DESIGN
==================================================

Use a visual structure such as:

WHY THIS PREDICTION?

┌──────────────────────────────────────┐
│ Recent Form                 TEAM 1   │
│ Team 1 has stronger recent results.  │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Venue Performance           TEAM 1   │
│ Better historical performance here.  │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Head-to-Head                TEAM 2   │
│ Team 2 has the stronger record.      │
└──────────────────────────────────────┘

The explanation should be easy for a normal cricket viewer to understand.

Avoid technical terms such as:

feature vector
classifier
logistic regression
random forest probability
ROC-AUC
training data

on the prediction result page.

==================================================
9. PITCH TYPE DISCLAIMER
==================================================

Pitch Type should remain visible because it is part of the prediction form.

However, clearly indicate in a subtle information label:

"Pitch type is provided as match context and is not directly used by the current prediction model."

Do NOT claim that CricVision learned pitch effects.

==================================================
10. ANALYTICS PAGE
==================================================

Create a dedicated:

ANALYTICS

page.

This page should focus on cricket insights rather than technical ML terminology.

Include:

Format selector:

TEST | ODI | T20 | IPL

Sections:

TEAM PERFORMANCE

Show useful historical metrics such as:

- Matches
- Wins
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate

VENUE INSIGHTS

Show:

- Matches at venue
- Team wins
- Team win rate
- Venue performance comparison

HEAD-TO-HEAD

Show:

- Team 1 vs Team 2
- Historical matches
- Team 1 wins
- Team 2 wins
- Win-rate comparison

Use charts and clean visualizations where useful.

Do not fill the page with technical ML metrics.

==================================================
11. TEAM INTELLIGENCE PAGE
==================================================

Create a dedicated:

TEAM INTELLIGENCE

page.

Allow the user to select a team.

Show:

Team Overview

- Matches
- Wins
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate
- Historical Performance

Add sections:

RECENT FORM

Show recent results visually.

BATTING PROFILE

Show average scoring performance.

BOWLING PROFILE

Show wicket-taking performance.

VENUE PERFORMANCE

Show venues where the team has historical match data and performance.

HEAD-TO-HEAD

Allow comparison against another team.

Use simple cricket terminology.

Do not use unnecessary ML language.

==================================================
12. PREDICTION HISTORY
==================================================

Keep Prediction History.

Each record should show:

Format
Team 1
Team 2
Venue
Predicted Winner
Team 1 Probability
Team 2 Probability
Draw Probability if TEST
Date

Add format filtering:

ALL
TEST
ODI
T20
IPL

Use a clean table/card design.

==================================================
13. ABOUT MODEL PAGE
==================================================

Keep technical information ONLY here.

Title:

ABOUT CRICVISION

Subtitle:

How CricVision Makes Predictions

Explain the prediction system in simple language.

Show the main factors used:

- Team Strength
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate
- Head-to-Head Performance
- Venue Performance
- Toss Information

Explain that different cricket formats use trained models based on historical match data.

Create a separate:

MODEL DETAILS

section.

Here technical terms such as:

Random Forest
Logistic Regression
Historical Dataset
Model Accuracy
F1 Score
ROC-AUC

may be displayed where appropriate.

Do NOT put these technical details on the Overview or Prediction pages.

For TEST specifically mention:

TEST supports three possible outcomes:

Team 1 Win
Team 2 Win
Draw

Also clearly state:

"Pitch Type is currently a contextual input and is not directly used by the prediction model."

==================================================
14. PREDICTION EXPLANATION LOGIC
==================================================

The UI should be designed around explainable prediction.

The final prediction page should visually communicate:

Prediction
↓
Probability
↓
Key Factors
↓
Why those factors support the prediction

Example structure:

PREDICTED WINNER
India

India — 64%
Australia — 36%

WHY THIS PREDICTION?

✓ Stronger recent form
✓ Better historical win rate
✓ Higher average scoring performance
✓ Better venue record

HEAD-TO-HEAD
Australia has an advantage

FINAL CONTEXT
Venue and toss information were considered where available.

Do not claim a factor influenced the prediction unless that factor is actually part of the model's input for that format.

==================================================
15. VISUAL STYLE
==================================================

Preserve the current visual direction:

- Dark navy/black background
- Cyan/blue primary accent
- Subtle purple secondary accent
- Thin borders
- Grid background
- Rounded cards
- Strong geometric typography
- Clean dashboard layout
- Premium sports analytics appearance

However, reduce visual clutter.

Avoid:

- Excessive glow
- Excessive gradients
- Excessive glassmorphism
- Random neon text
- Too many decorative icons
- Fake AI branding
- Unnecessary animations

The design should look professional, mature and implementation-ready.

==================================================
16. INFORMATION HIERARCHY
==================================================

Prioritize information in this order:

1. Match Prediction
2. Predicted Winner
3. Win Probabilities
4. Why the prediction was made
5. Key cricket factors
6. Historical analytics
7. Technical model information

Technical ML details should never dominate the user experience.

==================================================
17. FINAL NAVIGATION
==================================================

The final application should have exactly these main sections:

OVERVIEW
MATCH PREDICTOR
ANALYTICS
TEAM INTELLIGENCE
PREDICTION HISTORY
ABOUT MODEL

==================================================
18. FINAL PRODUCT FEEL
==================================================

The finished website should feel like:

A professional cricket intelligence and prediction dashboard.

It should NOT feel like:

- A generic AI website
- A machine-learning assignment dashboard
- An IPL-only website
- A live cricket score application
- A betting platform

CricVision should clearly communicate:

UNDERSTAND THE TEAMS.
UNDERSTAND THE CONDITIONS.
UNDERSTAND THE PREDICTION.

Keep the current MATCHAI design foundation, but evolve it into the final CricVision product.
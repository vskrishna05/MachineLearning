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

Use:

Cricket Intelligence & Match Prediction

Do not repeatedly show technical machine-learning terminology in the branding.

Remove unnecessary labels such as:

"AI ENGINE ONLINE"

from multiple places.

If a system-status indicator is retained, use:

SYSTEM ONLINE


==================================================
2. SIDEBAR NAVIGATION
==================================================

Update the sidebar to:

Overview
Match Predictor
Analytics
Team Intelligence
Prediction History
About Model

Do not add unnecessary pages.

Keep the existing sidebar style and visual structure.


==================================================
3. OVERVIEW PAGE
==================================================

Make the Overview page the main CricVision dashboard.

Hero:

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

Do not show fake statistics on these cards.


==================================================
4. REMOVE UNNECESSARY ML CONTENT
==================================================

Remove unnecessary ML terminology from the main dashboard.

Do NOT repeatedly display:

- Logistic Regression
- Random Forest
- ROC-AUC
- F1 Score
- Model accuracy
- "AI ENGINE ONLINE"
- Fake dataset counters
- Artificial ML status messages

Technical model information should appear ONLY on:

ABOUT MODEL


==================================================
5. MATCH PREDICTOR
==================================================

Create one reusable prediction interface for:

TEST
ODI
T20
IPL

Show format selector:

TEST | ODI | T20 | IPL

Inputs:

Team 1
Team 2
Venue
Pitch Type
Toss Winner
Toss Decision

Use clean searchable dropdown/select components.

Pitch Type:

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

- Live score prediction
- Ball-by-ball prediction
- Live win probability
- Fantasy prediction
- Betting features


==================================================
6. TEAM SELECTION — VERY IMPORTANT
==================================================

The application must NOT use a small hardcoded team list.

Team lists must be format-specific.

TEST:
Show available Test teams.

ODI:
Show available ODI teams.

T20:
Support the COMPLETE historical T20I team/country coverage available from the backend/model dataset.

The T20 interface must comfortably support 100+ teams/countries.

IPL:
Show IPL franchises.

Team selection must use:

Search teams...

with a scrollable results list.

Example:

TEAM 1

[ Search team... 🔍 ]

When opened:

India
Australia
England
Pakistan
South Africa
New Zealand
Sri Lanka
Bangladesh
Afghanistan
Zimbabwe
Ireland
Nepal
Namibia
Scotland
United States
...
and all other available teams.

Do NOT limit the UI to only popular countries.

The actual React application will later load the complete team list dynamically from the FastAPI backend.

Team 1 and Team 2 cannot be the same.


==================================================
7. VENUE SELECTION
==================================================

Venue must also use a searchable dropdown.

Use:

Search venue...

Do NOT display only a few popular venues.

The interface must be able to handle a large number of historical venues returned by the backend.

Venue availability should depend on the selected format where appropriate.


==================================================
8. PREDICTION RESULT
==================================================

After prediction, show:

TEAM 1
vs
TEAM 2

Format
Venue
Pitch Type
Toss information

Main result:

PREDICTED WINNER

[Winning Team]

Then show:

Team 1 Win Probability
Team 2 Win Probability

Use clean horizontal probability bars or circular indicators.

For TEST ONLY, show:

Draw Probability

TEST has three possible outcomes:

Team 1 Win
Team 2 Win
Draw

ODI, T20 and IPL must only show:

Team 1 Win
Team 2 Win

Add:

NEW PREDICTION


==================================================
9. WHY THIS PREDICTION — VERY IMPORTANT
==================================================

Immediately below the prediction result, create a prominent section:

WHY THIS PREDICTION?

Alternative title:

WHY DOES CRICVISION PREDICT THIS TEAM?

This section is essential.

It must clearly explain WHY the predicted winner was selected.

Show 4–6 key factors.

Possible factors:

Recent Form
Overall Win Rate
Batting Performance
Bowling Performance
Run Rate
Head-to-Head Record
Venue Performance
Toss Impact

Each factor should contain:

Factor name
Short plain-English explanation
Advantage indicator

Example:

RECENT FORM

"Team 1 has shown stronger recent results than Team 2."

TEAM 1 ADVANTAGE


Example:

VENUE PERFORMANCE

"Team 1 has historically performed better at this venue."

TEAM 1 ADVANTAGE


Example:

HEAD-TO-HEAD

"Team 2 has the stronger historical record against Team 1."

TEAM 2 ADVANTAGE


Example:

BATTING PERFORMANCE

"Team 1 has a higher historical average scoring performance."

TEAM 1 ADVANTAGE


If there is no meaningful difference:

NO CLEAR ADVANTAGE

IMPORTANT:

Do not invent statistics or explanations.

The eventual React implementation will generate these explanations from the actual prediction features returned by the backend.

Only explain factors that are actually used by the prediction model for that format.


==================================================
10. PREDICTION EXPLANATION HIERARCHY
==================================================

The result page should follow this hierarchy:

PREDICTED WINNER
        ↓
WIN PROBABILITY
        ↓
WHY THIS PREDICTION?
        ↓
KEY FACTORS
        ↓
MATCH CONTEXT

Example:

PREDICTED WINNER

India

India 64%
Australia 36%

----------------------------

WHY THIS PREDICTION?

✓ Stronger recent form
✓ Higher historical win rate
✓ Better average scoring
✓ Stronger venue record

----------------------------

HEAD-TO-HEAD

Australia has the stronger historical record.

----------------------------

MATCH CONTEXT

Venue and toss information considered where available.


==================================================
11. PITCH TYPE
==================================================

Pitch Type should remain visible in the prediction form.

However, add a subtle information note:

"Pitch type is provided as match context and is not directly used by the current prediction model."

Do NOT claim that the model learned pitch effects.


==================================================
12. ANALYTICS PAGE
==================================================

Create a dedicated:

ANALYTICS

page.

This page should focus on cricket intelligence, not technical ML metrics.

Include:

TEST | ODI | T20 | IPL

Then show:

TEAM PERFORMANCE

- Matches
- Wins
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate

VENUE INSIGHTS

- Matches at venue
- Team wins
- Team win rate
- Venue comparison

HEAD-TO-HEAD

- Historical matches
- Team 1 wins
- Team 2 wins
- Win-rate comparison

Use clean charts and visual comparisons.

Do not overload this page with:

ROC-AUC
F1
model coefficients
classifier names
etc.


==================================================
13. TEAM INTELLIGENCE
==================================================

Create a dedicated:

TEAM INTELLIGENCE

page.

Allow the user to select a team using a searchable dropdown.

Show:

TEAM OVERVIEW

- Matches
- Wins
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate

RECENT FORM

Show recent results visually.

BATTING PROFILE

Show scoring performance.

BOWLING PROFILE

Show wicket-taking performance.

VENUE PERFORMANCE

Show historical performance across available venues.

HEAD-TO-HEAD

Allow comparison against another team.

Keep the terminology cricket-focused and easy to understand.


==================================================
14. PREDICTION HISTORY
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

Add filters:

ALL
TEST
ODI
T20
IPL

Use a clean table/card design.


==================================================
15. ABOUT MODEL
==================================================

Keep technical information ONLY here.

Title:

ABOUT CRICVISION

Subtitle:

How CricVision Makes Predictions

Explain the system in simple language.

Show the major prediction factors:

- Team Strength
- Win Rate
- Recent Form
- Average Runs
- Average Wickets
- Run Rate
- Head-to-Head Performance
- Venue Performance
- Toss Information

Create a separate:

MODEL DETAILS

section.

Technical information such as:

Random Forest
Logistic Regression
Historical Dataset
Model Accuracy
F1 Score
ROC-AUC

can be displayed here when appropriate.

Do not put these technical details on the main dashboard or prediction result page.

For TEST, clearly mention that it supports:

Team 1 Win
Team 2 Win
Draw

Also state:

"Pitch Type is currently a contextual input and is not directly used by the prediction model."


==================================================
16. NO LIVE PREDICTION
==================================================

CricVision is a PRE-MATCH prediction system.

Do NOT add:

Live score prediction
Ball-by-ball prediction
Live win probability
Fantasy cricket
Betting
Player prediction


==================================================
17. VISUAL STYLE
==================================================

Preserve the existing visual style.

Use:

- Dark navy/black background
- Cyan/blue primary accent
- Subtle purple secondary accent
- Thin borders
- Grid background
- Rounded cards
- Strong typography
- Premium cricket analytics appearance

Reduce clutter.

Avoid:

- Excessive gradients
- Excessive glow
- Excessive glassmorphism
- Random neon text
- Too many decorative elements
- Generic AI aesthetics
- Fake statistics


==================================================
18. INFORMATION PRIORITY
==================================================

Prioritize:

1. Match Prediction
2. Predicted Winner
3. Win Probability
4. Why This Prediction?
5. Key Cricket Factors
6. Analytics
7. Technical Model Information

Technical ML details should never dominate the user experience.


==================================================
19. FINAL NAVIGATION
==================================================

The final application should contain:

OVERVIEW
MATCH PREDICTOR
ANALYTICS
TEAM INTELLIGENCE
PREDICTION HISTORY
ABOUT MODEL


==================================================
20. FINAL PRODUCT FEEL
==================================================

The finished product should feel like:

A professional cricket intelligence and match prediction platform.

It should NOT feel like:

- A generic AI website
- A machine-learning assignment dashboard
- An IPL-only website
- A live cricket score application
- A betting platform

CricVision should communicate:

UNDERSTAND THE TEAMS.
UNDERSTAND THE CONDITIONS.
UNDERSTAND THE PREDICTION.

Keep the current design foundation but evolve it into a polished, implementation-ready CricVision product.

Make the design ready for React.js + FastAPI integration.

Do not use fake prediction data in the final implementation.
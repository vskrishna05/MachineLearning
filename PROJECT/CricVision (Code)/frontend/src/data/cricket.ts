export type Format = "TEST" | "ODI" | "T20" | "IPL";

export interface CricTeam {
  id: string;
  name: string;
  short: string;
  color: string;
  formats: Format[];
}

// ─── Test nations ─────────────────────────────────────────────────────────────
export const TEST_TEAMS: CricTeam[] = [
  { id: "AUS", name: "Australia",      short: "AUS", color: "#f5a623", formats: ["TEST","ODI","T20"] },
  { id: "ENG", name: "England",        short: "ENG", color: "#cf142b", formats: ["TEST","ODI","T20"] },
  { id: "IND", name: "India",          short: "IND", color: "#1b4bbd", formats: ["TEST","ODI","T20"] },
  { id: "PAK", name: "Pakistan",       short: "PAK", color: "#01824a", formats: ["TEST","ODI","T20"] },
  { id: "SA",  name: "South Africa",   short: "SA",  color: "#007a4d", formats: ["TEST","ODI","T20"] },
  { id: "NZ",  name: "New Zealand",    short: "NZ",  color: "#5a5a5a", formats: ["TEST","ODI","T20"] },
  { id: "WI",  name: "West Indies",    short: "WI",  color: "#7b0c2e", formats: ["TEST","ODI","T20"] },
  { id: "SL",  name: "Sri Lanka",      short: "SL",  color: "#003f87", formats: ["TEST","ODI","T20"] },
  { id: "BAN", name: "Bangladesh",     short: "BAN", color: "#006a4e", formats: ["TEST","ODI","T20"] },
  { id: "ZIM", name: "Zimbabwe",       short: "ZIM", color: "#006400", formats: ["TEST","ODI","T20"] },
  { id: "AFG", name: "Afghanistan",    short: "AFG", color: "#002868", formats: ["TEST","ODI","T20"] },
  { id: "IRE", name: "Ireland",        short: "IRE", color: "#169b62", formats: ["TEST","ODI","T20"] },
];

// ─── ODI nations (Test + associates) ─────────────────────────────────────────
export const ODI_TEAMS: CricTeam[] = [
  ...TEST_TEAMS,
  { id: "SCO",  name: "Scotland",           short: "SCO",  color: "#003078", formats: ["ODI","T20"] },
  { id: "NED",  name: "Netherlands",        short: "NED",  color: "#ff6400", formats: ["ODI","T20"] },
  { id: "NAM",  name: "Namibia",            short: "NAM",  color: "#003580", formats: ["ODI","T20"] },
  { id: "OMA",  name: "Oman",               short: "OMA",  color: "#db161b", formats: ["ODI","T20"] },
  { id: "UAE",  name: "United Arab Emirates",short: "UAE", color: "#009000", formats: ["ODI","T20"] },
  { id: "USA",  name: "United States",      short: "USA",  color: "#002868", formats: ["ODI","T20"] },
  { id: "CAN",  name: "Canada",             short: "CAN",  color: "#d52b1e", formats: ["ODI","T20"] },
  { id: "NEP",  name: "Nepal",              short: "NEP",  color: "#dc143c", formats: ["ODI","T20"] },
  { id: "PNG",  name: "Papua New Guinea",   short: "PNG",  color: "#000000", formats: ["ODI","T20"] },
  { id: "KEN",  name: "Kenya",              short: "KEN",  color: "#006600", formats: ["ODI","T20"] },
  { id: "HK",   name: "Hong Kong",          short: "HK",   color: "#dc143c", formats: ["ODI","T20"] },
  { id: "MAS",  name: "Malaysia",           short: "MAS",  color: "#cc0001", formats: ["ODI","T20"] },
  { id: "SGP",  name: "Singapore",          short: "SGP",  color: "#ef3340", formats: ["ODI","T20"] },
];

// ─── Full T20I team list (100+ nations) ───────────────────────────────────────
export const T20_TEAMS: CricTeam[] = [
  // Full Members
  { id: "AUS",  name: "Australia",            short: "AUS",  color: "#f5a623", formats: ["TEST","ODI","T20"] },
  { id: "ENG",  name: "England",              short: "ENG",  color: "#cf142b", formats: ["TEST","ODI","T20"] },
  { id: "IND",  name: "India",                short: "IND",  color: "#1b4bbd", formats: ["TEST","ODI","T20"] },
  { id: "PAK",  name: "Pakistan",             short: "PAK",  color: "#01824a", formats: ["TEST","ODI","T20"] },
  { id: "SA",   name: "South Africa",         short: "SA",   color: "#007a4d", formats: ["TEST","ODI","T20"] },
  { id: "NZ",   name: "New Zealand",          short: "NZ",   color: "#5a5a5a", formats: ["TEST","ODI","T20"] },
  { id: "WI",   name: "West Indies",          short: "WI",   color: "#7b0c2e", formats: ["TEST","ODI","T20"] },
  { id: "SL",   name: "Sri Lanka",            short: "SL",   color: "#003f87", formats: ["TEST","ODI","T20"] },
  { id: "BAN",  name: "Bangladesh",           short: "BAN",  color: "#006a4e", formats: ["TEST","ODI","T20"] },
  { id: "ZIM",  name: "Zimbabwe",             short: "ZIM",  color: "#006400", formats: ["TEST","ODI","T20"] },
  { id: "AFG",  name: "Afghanistan",          short: "AFG",  color: "#002868", formats: ["TEST","ODI","T20"] },
  { id: "IRE",  name: "Ireland",              short: "IRE",  color: "#169b62", formats: ["TEST","ODI","T20"] },
  // Associates — Americas
  { id: "USA",  name: "United States",        short: "USA",  color: "#002868", formats: ["ODI","T20"] },
  { id: "CAN",  name: "Canada",               short: "CAN",  color: "#d52b1e", formats: ["ODI","T20"] },
  { id: "BER",  name: "Bermuda",              short: "BER",  color: "#e32118", formats: ["T20"] },
  { id: "CAY",  name: "Cayman Islands",       short: "CAY",  color: "#003087", formats: ["T20"] },
  { id: "TT",   name: "Trinidad & Tobago",    short: "TT",   color: "#ce1126", formats: ["T20"] },
  { id: "BAR",  name: "Barbados",             short: "BAR",  color: "#00267f", formats: ["T20"] },
  { id: "JAM",  name: "Jamaica",              short: "JAM",  color: "#000000", formats: ["T20"] },
  { id: "GUY",  name: "Guyana",               short: "GUY",  color: "#009e60", formats: ["T20"] },
  { id: "PAN",  name: "Panama",               short: "PAN",  color: "#da121a", formats: ["T20"] },
  { id: "ARG",  name: "Argentina",            short: "ARG",  color: "#74acdf", formats: ["T20"] },
  { id: "BRA",  name: "Brazil",               short: "BRA",  color: "#009c3b", formats: ["T20"] },
  { id: "MEX",  name: "Mexico",               short: "MEX",  color: "#006847", formats: ["T20"] },
  // Europe
  { id: "SCO",  name: "Scotland",             short: "SCO",  color: "#003078", formats: ["ODI","T20"] },
  { id: "NED",  name: "Netherlands",          short: "NED",  color: "#ff6400", formats: ["ODI","T20"] },
  { id: "GER",  name: "Germany",              short: "GER",  color: "#000000", formats: ["T20"] },
  { id: "IOM",  name: "Isle of Man",          short: "IOM",  color: "#cf142b", formats: ["T20"] },
  { id: "JER",  name: "Jersey",               short: "JER",  color: "#cf142b", formats: ["T20"] },
  { id: "GUE",  name: "Guernsey",             short: "GUE",  color: "#cf142b", formats: ["T20"] },
  { id: "ITA",  name: "Italy",                short: "ITA",  color: "#009246", formats: ["T20"] },
  { id: "ESP",  name: "Spain",                short: "ESP",  color: "#aa151b", formats: ["T20"] },
  { id: "FRA",  name: "France",               short: "FRA",  color: "#002395", formats: ["T20"] },
  { id: "DEN",  name: "Denmark",              short: "DEN",  color: "#c60c30", formats: ["T20"] },
  { id: "NOR",  name: "Norway",               short: "NOR",  color: "#ef2b2d", formats: ["T20"] },
  { id: "SWE",  name: "Sweden",               short: "SWE",  color: "#006aa7", formats: ["T20"] },
  { id: "FIN",  name: "Finland",              short: "FIN",  color: "#003580", formats: ["T20"] },
  { id: "BEL",  name: "Belgium",              short: "BEL",  color: "#000000", formats: ["T20"] },
  { id: "AUT",  name: "Austria",              short: "AUT",  color: "#ed2939", formats: ["T20"] },
  { id: "SER",  name: "Serbia",               short: "SER",  color: "#c6363c", formats: ["T20"] },
  { id: "POR",  name: "Portugal",             short: "POR",  color: "#006600", formats: ["T20"] },
  { id: "ROM",  name: "Romania",              short: "ROM",  color: "#002b7f", formats: ["T20"] },
  { id: "CZE",  name: "Czech Republic",       short: "CZE",  color: "#d7141a", formats: ["T20"] },
  { id: "EST",  name: "Estonia",              short: "EST",  color: "#0072ce", formats: ["T20"] },
  { id: "MLT",  name: "Malta",                short: "MLT",  color: "#cf142b", formats: ["T20"] },
  { id: "GIB",  name: "Gibraltar",            short: "GIB",  color: "#cf142b", formats: ["T20"] },
  { id: "CYP",  name: "Cyprus",               short: "CYP",  color: "#4e7fb1", formats: ["T20"] },
  { id: "GRC",  name: "Greece",               short: "GRC",  color: "#0d5eaf", formats: ["T20"] },
  // Asia
  { id: "UAE",  name: "United Arab Emirates", short: "UAE",  color: "#009000", formats: ["ODI","T20"] },
  { id: "OMA",  name: "Oman",                 short: "OMA",  color: "#db161b", formats: ["ODI","T20"] },
  { id: "NEP",  name: "Nepal",                short: "NEP",  color: "#dc143c", formats: ["ODI","T20"] },
  { id: "HK",   name: "Hong Kong",            short: "HK",   color: "#dc143c", formats: ["ODI","T20"] },
  { id: "MAS",  name: "Malaysia",             short: "MAS",  color: "#cc0001", formats: ["ODI","T20"] },
  { id: "SGP",  name: "Singapore",            short: "SGP",  color: "#ef3340", formats: ["ODI","T20"] },
  { id: "KUW",  name: "Kuwait",               short: "KUW",  color: "#007a3d", formats: ["T20"] },
  { id: "BAH",  name: "Bahrain",              short: "BAH",  color: "#ce1126", formats: ["T20"] },
  { id: "KSA",  name: "Saudi Arabia",         short: "KSA",  color: "#006c35", formats: ["T20"] },
  { id: "QAT",  name: "Qatar",                short: "QAT",  color: "#8d1b3d", formats: ["T20"] },
  { id: "KHM",  name: "Cambodia",             short: "KHM",  color: "#032ea1", formats: ["T20"] },
  { id: "MYN",  name: "Myanmar",              short: "MYN",  color: "#fecb00", formats: ["T20"] },
  { id: "THA",  name: "Thailand",             short: "THA",  color: "#a51931", formats: ["T20"] },
  { id: "INA",  name: "Indonesia",            short: "INA",  color: "#ce1126", formats: ["T20"] },
  { id: "PHI",  name: "Philippines",          short: "PHI",  color: "#0038a8", formats: ["T20"] },
  { id: "CHN",  name: "China",                short: "CHN",  color: "#de2910", formats: ["T20"] },
  { id: "KOR",  name: "South Korea",          short: "KOR",  color: "#003478", formats: ["T20"] },
  { id: "JPN",  name: "Japan",                short: "JPN",  color: "#bc002d", formats: ["T20"] },
  { id: "BHU",  name: "Bhutan",               short: "BHU",  color: "#ff8000", formats: ["T20"] },
  { id: "MDV",  name: "Maldives",             short: "MDV",  color: "#007e3a", formats: ["T20"] },
  { id: "MGL",  name: "Mongolia",             short: "MGL",  color: "#c4272f", formats: ["T20"] },
  { id: "IRN",  name: "Iran",                 short: "IRN",  color: "#239f40", formats: ["T20"] },
  { id: "TJK",  name: "Tajikistan",           short: "TJK",  color: "#cc0000", formats: ["T20"] },
  { id: "KGZ",  name: "Kyrgyzstan",           short: "KGZ",  color: "#e8112d", formats: ["T20"] },
  { id: "KAZ",  name: "Kazakhstan",           short: "KAZ",  color: "#00afca", formats: ["T20"] },
  { id: "UZB",  name: "Uzbekistan",           short: "UZB",  color: "#1eb53a", formats: ["T20"] },
  // Africa
  { id: "NAM",  name: "Namibia",              short: "NAM",  color: "#003580", formats: ["ODI","T20"] },
  { id: "KEN",  name: "Kenya",                short: "KEN",  color: "#006600", formats: ["ODI","T20"] },
  { id: "TAN",  name: "Tanzania",             short: "TAN",  color: "#1eb53a", formats: ["T20"] },
  { id: "UGA",  name: "Uganda",               short: "UGA",  color: "#000000", formats: ["ODI","T20"] },
  { id: "NGR",  name: "Nigeria",              short: "NGR",  color: "#008751", formats: ["T20"] },
  { id: "GHA",  name: "Ghana",                short: "GHA",  color: "#006b3f", formats: ["T20"] },
  { id: "MOZ",  name: "Mozambique",           short: "MOZ",  color: "#009a44", formats: ["T20"] },
  { id: "BOT",  name: "Botswana",             short: "BOT",  color: "#75aadb", formats: ["T20"] },
  { id: "RWA",  name: "Rwanda",               short: "RWA",  color: "#20603d", formats: ["T20"] },
  { id: "SWZ",  name: "Eswatini",             short: "SWZ",  color: "#3e5eb9", formats: ["T20"] },
  { id: "LES",  name: "Lesotho",              short: "LES",  color: "#009543", formats: ["T20"] },
  { id: "MLW",  name: "Malawi",               short: "MLW",  color: "#000000", formats: ["T20"] },
  { id: "SL2",  name: "Sierra Leone",         short: "SLE",  color: "#1eb53a", formats: ["T20"] },
  { id: "GAM",  name: "Gambia",               short: "GAM",  color: "#3a7728", formats: ["T20"] },
  { id: "SEN",  name: "Senegal",              short: "SEN",  color: "#00853f", formats: ["T20"] },
  { id: "ETH",  name: "Ethiopia",             short: "ETH",  color: "#078930", formats: ["T20"] },
  // Pacific / Oceania
  { id: "PNG",  name: "Papua New Guinea",     short: "PNG",  color: "#000000", formats: ["ODI","T20"] },
  { id: "VAN",  name: "Vanuatu",              short: "VAN",  color: "#009543", formats: ["T20"] },
  { id: "SAMOA",name: "Samoa",                short: "SAM",  color: "#ce1126", formats: ["T20"] },
  { id: "FIJI", name: "Fiji",                 short: "FIJ",  color: "#003f87", formats: ["T20"] },
  { id: "COOK", name: "Cook Islands",         short: "COK",  color: "#003087", formats: ["T20"] },
  { id: "TONG", name: "Tonga",                short: "TON",  color: "#c10000", formats: ["T20"] },
];

// ─── IPL franchises ───────────────────────────────────────────────────────────
export const IPL_TEAMS: CricTeam[] = [
  { id: "MI",   name: "Mumbai Indians",                 short: "MI",   color: "#004BA0", formats: ["IPL"] },
  { id: "CSK",  name: "Chennai Super Kings",            short: "CSK",  color: "#d4a017", formats: ["IPL"] },
  { id: "RCB",  name: "Royal Challengers Bangalore",    short: "RCB",  color: "#c0272d", formats: ["IPL"] },
  { id: "KKR",  name: "Kolkata Knight Riders",          short: "KKR",  color: "#5b2d8e", formats: ["IPL"] },
  { id: "DC",   name: "Delhi Capitals",                 short: "DC",   color: "#17479e", formats: ["IPL"] },
  { id: "PBKS", name: "Punjab Kings",                   short: "PBKS", color: "#ed1b24", formats: ["IPL"] },
  { id: "RR",   name: "Rajasthan Royals",              short: "RR",   color: "#254aa5", formats: ["IPL"] },
  { id: "SRH",  name: "Sunrisers Hyderabad",            short: "SRH",  color: "#f7a721", formats: ["IPL"] },
  { id: "GT",   name: "Gujarat Titans",                 short: "GT",   color: "#1c1c6b", formats: ["IPL"] },
  { id: "LSG",  name: "Lucknow Super Giants",           short: "LSG",  color: "#5ba4cf", formats: ["IPL"] },
];

// ─── Venues ───────────────────────────────────────────────────────────────────
export const VENUES_INDIA: string[] = [
  "Wankhede Stadium, Mumbai",
  "Eden Gardens, Kolkata",
  "MA Chidambaram Stadium, Chennai",
  "M. Chinnaswamy Stadium, Bangalore",
  "Narendra Modi Stadium, Ahmedabad",
  "Rajiv Gandhi Intl. Stadium, Hyderabad",
  "Arun Jaitley Stadium, Delhi",
  "Sawai Mansingh Stadium, Jaipur",
  "PCA Stadium, Mohali",
  "BRSABV Ekana Stadium, Lucknow",
  "DY Patil Stadium, Mumbai",
  "Brabourne Stadium, Mumbai",
  "JSCA International Stadium Complex, Ranchi",
  "Greenfield International Stadium, Thiruvananthapuram",
  "Holkar Cricket Stadium, Indore",
  "VCA Stadium, Nagpur",
  "Barabati Stadium, Cuttack",
  "Himachal Pradesh Cricket Association Stadium, Dharamsala",
  "Shaheed Veer Narayan Singh International Stadium, Raipur",
  "KSCA Cricket Ground, Hubli",
];

export const VENUES_INTERNATIONAL: string[] = [
  "Lord's Cricket Ground, London",
  "The Oval, London",
  "Edgbaston, Birmingham",
  "Headingley, Leeds",
  "Old Trafford, Manchester",
  "Trent Bridge, Nottingham",
  "The Rose Bowl, Southampton",
  "MCG, Melbourne",
  "SCG, Sydney",
  "Adelaide Oval, Adelaide",
  "The Gabba, Brisbane",
  "Perth Stadium, Perth",
  "Bellerive Oval, Hobart",
  "Manuka Oval, Canberra",
  "Newlands, Cape Town",
  "Wanderers, Johannesburg",
  "Kingsmead, Durban",
  "SuperSport Park, Centurion",
  "St George's Park, Port Elizabeth",
  "Gaddafi Stadium, Lahore",
  "National Stadium, Karachi",
  "Rawalpindi Cricket Stadium",
  "Pindi Cricket Stadium, Rawalpindi",
  "Multan Cricket Stadium",
  "Shaheed Moshtaq Ahmad Rizvi Stadium, Islamabad",
  "Pallekele International Cricket Stadium",
  "R. Premadasa Stadium, Colombo",
  "Sinhalese Sports Club Ground, Colombo",
  "Galle International Stadium",
  "Dubai International Stadium",
  "Sharjah Cricket Stadium",
  "Sheikh Zayed Stadium, Abu Dhabi",
  "Providence Stadium, Guyana",
  "Kensington Oval, Barbados",
  "Queens Park Oval, Trinidad",
  "Sabina Park, Jamaica",
  "National Cricket Stadium, Grenada",
  "Sir Vivian Richards Stadium, Antigua",
  "Warner Park, St Kitts",
  "Arnos Vale Ground, St Vincent",
  "Shere Bangla National Stadium, Dhaka",
  "Zahur Ahmed Chowdhury Stadium, Chittagong",
  "Sylhet International Cricket Stadium",
  "Harare Sports Club",
  "Queens Sports Club, Bulawayo",
  "Seddon Park, Hamilton",
  "Bay Oval, Mount Maunganui",
  "Basin Reserve, Wellington",
  "Hagley Oval, Christchurch",
  "Eden Park, Auckland",
  "SuperSport Park, Centurion",
  "Boland Park, Paarl",
  "Buffalo Park, East London",
  "Mangaung Oval, Bloemfontein",
  "M. A. Chidambaram Stadium, Chennai",
  "Sylhet International Cricket Stadium",
];

export const ALL_VENUES = [...new Set([...VENUES_INDIA, ...VENUES_INTERNATIONAL])].sort();

export const PITCH_TYPES = [
  "Balanced",
  "Batting Friendly",
  "Bowling Friendly",
  "Spin Friendly",
  "Seam Friendly",
  "Slow & Low",
  "Bouncy",
];

export const FORMAT_META: Record<Format, { label: string; fullName: string; desc: string }> = {
  TEST: { label: "TEST", fullName: "Test Cricket",            desc: "Three-outcome prediction with win and draw analysis." },
  ODI:  { label: "ODI",  fullName: "One-Day International",   desc: "Pre-match outcome prediction using historical team and venue performance." },
  T20:  { label: "T20",  fullName: "T20 International",       desc: "Pre-match prediction focused on recent form and performance trends." },
  IPL:  { label: "IPL",  fullName: "Indian Premier League",   desc: "Pre-match prediction using franchise history, form and venue performance." },
};

export function teamsForFormat(fmt: Format): CricTeam[] {
  if (fmt === "TEST") return TEST_TEAMS;
  if (fmt === "ODI")  return ODI_TEAMS;
  if (fmt === "T20")  return T20_TEAMS;
  return IPL_TEAMS;
}

export interface PredictionRecord {
  id: string;
  date: Date;
  format: Format;
  team1: CricTeam;
  team2: CricTeam;
  venue: string;
  pitchType: string;
  tossWinner?: string;
  tossDecision?: string;
  winner: CricTeam;
  p1: number;
  p2: number;
  pDraw?: number;
}

const ELO: Record<string, number> = {
  AUS:1650, ENG:1580, IND:1640, PAK:1540, SA:1510, NZ:1520, WI:1380,
  SL:1360, BAN:1320, ZIM:1180, AFG:1290, IRE:1240,
  SCO:1200, NED:1210, NAM:1160, OMA:1150, UAE:1155, USA:1195,
  NEP:1170, PNG:1130, HK:1110, MAS:1090, SGP:1080, KEN:1100,
  MI:1540, CSK:1558, RCB:1480, KKR:1510, DC:1472, PBKS:1451,
  RR:1494, SRH:1502, GT:1572, LSG:1528,
};

export function estimateProbs(t1: CricTeam, t2: CricTeam, format: Format) {
  const e1 = ELO[t1.id] ?? 1350;
  const e2 = ELO[t2.id] ?? 1350;
  const rawP1 = 1 / (1 + Math.pow(10, (e2 - e1) / 400));
  if (format === "TEST") {
    const p1 = rawP1 * 0.74;
    const p2 = (1 - rawP1) * 0.74;
    const draw = 1 - p1 - p2;
    return { p1: +(p1 * 100).toFixed(1), p2: +(p2 * 100).toFixed(1), pDraw: +(draw * 100).toFixed(1) };
  }
  return { p1: +(rawP1 * 100).toFixed(1), p2: +((1 - rawP1) * 100).toFixed(1) };
}

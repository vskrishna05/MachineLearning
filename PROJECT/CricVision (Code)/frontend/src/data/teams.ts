export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  accent: string;
  gradient: string;
  stats: {
    winRate: number;
    recentForm: number; // out of 5
    avgRuns: number;
    avgWickets: number;
    runRate: number;
    elo: number;
    totalMatches: number;
    wins: number;
  };
  recentResults: ("W" | "L")[];
  homeGround: string;
}

export const TEAMS: Team[] = [
  {
    id: "MI",
    name: "Mumbai Indians",
    shortName: "MI",
    color: "#004BA0",
    accent: "#00D4FF",
    gradient: "from-blue-900 to-cyan-900",
    homeGround: "Wankhede Stadium",
    stats: { winRate: 0.582, recentForm: 3, avgRuns: 168.4, avgWickets: 6.8, runRate: 8.42, elo: 1540, totalMatches: 247, wins: 144 },
    recentResults: ["W", "L", "W", "W", "L"],
  },
  {
    id: "CSK",
    name: "Chennai Super Kings",
    shortName: "CSK",
    color: "#F9CD05",
    accent: "#FFD700",
    gradient: "from-yellow-900 to-amber-900",
    homeGround: "MA Chidambaram Stadium",
    stats: { winRate: 0.594, recentForm: 4, avgRuns: 171.2, avgWickets: 6.5, runRate: 8.56, elo: 1558, totalMatches: 234, wins: 139 },
    recentResults: ["W", "W", "L", "W", "W"],
  },
  {
    id: "RCB",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    color: "#C0272D",
    accent: "#FF4444",
    gradient: "from-red-900 to-rose-900",
    homeGround: "M. Chinnaswamy Stadium",
    stats: { winRate: 0.491, recentForm: 2, avgRuns: 172.8, avgWickets: 7.2, runRate: 8.64, elo: 1480, totalMatches: 243, wins: 119 },
    recentResults: ["L", "W", "L", "L", "W"],
  },
  {
    id: "KKR",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    color: "#2E0854",
    accent: "#B983FF",
    gradient: "from-purple-950 to-violet-900",
    homeGround: "Eden Gardens",
    stats: { winRate: 0.527, recentForm: 3, avgRuns: 165.6, avgWickets: 6.9, runRate: 8.28, elo: 1510, totalMatches: 243, wins: 128 },
    recentResults: ["W", "L", "W", "L", "W"],
  },
  {
    id: "DC",
    name: "Delhi Capitals",
    shortName: "DC",
    color: "#17479E",
    accent: "#EF1B23",
    gradient: "from-blue-900 to-red-900",
    homeGround: "Arun Jaitley Stadium",
    stats: { winRate: 0.488, recentForm: 2, avgRuns: 163.2, avgWickets: 7.0, runRate: 8.16, elo: 1472, totalMatches: 237, wins: 116 },
    recentResults: ["L", "L", "W", "L", "W"],
  },
  {
    id: "PBKS",
    name: "Punjab Kings",
    shortName: "PBKS",
    color: "#ED1B24",
    accent: "#FF6B6B",
    gradient: "from-red-900 to-orange-900",
    homeGround: "PCA Stadium",
    stats: { winRate: 0.463, recentForm: 2, avgRuns: 167.8, avgWickets: 7.3, runRate: 8.39, elo: 1451, totalMatches: 240, wins: 111 },
    recentResults: ["L", "W", "L", "L", "L"],
  },
  {
    id: "RR",
    name: "Rajasthan Royals",
    shortName: "RR",
    color: "#254AA5",
    accent: "#FF69B4",
    gradient: "from-blue-900 to-pink-900",
    homeGround: "Sawai Mansingh Stadium",
    stats: { winRate: 0.506, recentForm: 3, avgRuns: 166.4, avgWickets: 6.7, runRate: 8.32, elo: 1494, totalMatches: 218, wins: 110 },
    recentResults: ["W", "W", "L", "W", "L"],
  },
  {
    id: "SRH",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    color: "#F7A721",
    accent: "#FF8C00",
    gradient: "from-orange-900 to-amber-900",
    homeGround: "Rajiv Gandhi Intl. Stadium",
    stats: { winRate: 0.512, recentForm: 3, avgRuns: 169.0, avgWickets: 6.6, runRate: 8.45, elo: 1502, totalMatches: 212, wins: 109 },
    recentResults: ["W", "W", "W", "L", "L"],
  },
  {
    id: "GT",
    name: "Gujarat Titans",
    shortName: "GT",
    color: "#1C1C6B",
    accent: "#1DD6CC",
    gradient: "from-indigo-950 to-teal-900",
    homeGround: "Narendra Modi Stadium",
    stats: { winRate: 0.625, recentForm: 4, avgRuns: 170.6, avgWickets: 6.3, runRate: 8.53, elo: 1572, totalMatches: 64, wins: 40 },
    recentResults: ["W", "W", "W", "L", "W"],
  },
  {
    id: "LSG",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    color: "#6CBCE8",
    accent: "#1CD4BC",
    gradient: "from-cyan-900 to-teal-900",
    homeGround: "BRSABV Ekana Stadium",
    stats: { winRate: 0.565, recentForm: 3, avgRuns: 164.8, avgWickets: 6.8, runRate: 8.24, elo: 1528, totalMatches: 64, wins: 36 },
    recentResults: ["W", "L", "W", "W", "L"],
  },
];

export const getTeamById = (id: string) => TEAMS.find((t) => t.id === id);

export const H2H_DATA: Record<string, Record<string, { meetings: number; t1Wins: number; t2Wins: number }>> = {
  MI: {
    CSK: { meetings: 36, t1Wins: 19, t2Wins: 17 },
    RCB: { meetings: 32, t1Wins: 20, t2Wins: 12 },
    KKR: { meetings: 30, t1Wins: 18, t2Wins: 12 },
    DC: { meetings: 28, t1Wins: 17, t2Wins: 11 },
    RR: { meetings: 26, t1Wins: 14, t2Wins: 12 },
    SRH: { meetings: 22, t1Wins: 12, t2Wins: 10 },
    PBKS: { meetings: 28, t1Wins: 17, t2Wins: 11 },
    GT: { meetings: 6, t1Wins: 3, t2Wins: 3 },
    LSG: { meetings: 6, t1Wins: 4, t2Wins: 2 },
  },
  CSK: {
    MI: { meetings: 36, t1Wins: 17, t2Wins: 19 },
    RCB: { meetings: 30, t1Wins: 20, t2Wins: 10 },
    KKR: { meetings: 28, t1Wins: 16, t2Wins: 12 },
    DC: { meetings: 26, t1Wins: 15, t2Wins: 11 },
    RR: { meetings: 24, t1Wins: 15, t2Wins: 9 },
    SRH: { meetings: 20, t1Wins: 12, t2Wins: 8 },
    PBKS: { meetings: 28, t1Wins: 18, t2Wins: 10 },
    GT: { meetings: 6, t1Wins: 3, t2Wins: 3 },
    LSG: { meetings: 6, t1Wins: 3, t2Wins: 3 },
  },
};

export function getH2H(t1: string, t2: string) {
  const d = H2H_DATA[t1]?.[t2] ?? H2H_DATA[t2]?.[t1];
  if (!d) return { meetings: 18, t1Wins: 9, t2Wins: 9 };
  const flip = !H2H_DATA[t1]?.[t2];
  return flip ? { meetings: d.meetings, t1Wins: d.t2Wins, t2Wins: d.t1Wins } : d;
}

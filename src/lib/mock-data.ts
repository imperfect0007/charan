// Static, deterministic mock data so the dashboards render the same numbers
// in every environment (server, client, tests, deployed demo).

export type FraudTrendPoint = {
  day: number;
  fraud: number;
  blocked: number;
  ivt: number;
};

export const fraudTrend: FraudTrendPoint[] = [
  { day: 1, fraud: 18, blocked: 12, ivt: 9 },
  { day: 3, fraud: 25, blocked: 17, ivt: 14 },
  { day: 5, fraud: 31, blocked: 22, ivt: 18 },
  { day: 7, fraud: 22, blocked: 15, ivt: 12 },
  { day: 9, fraud: 35, blocked: 28, ivt: 19 },
  { day: 11, fraud: 28, blocked: 21, ivt: 16 },
  { day: 13, fraud: 41, blocked: 33, ivt: 24 },
  { day: 15, fraud: 33, blocked: 26, ivt: 20 },
  { day: 17, fraud: 38, blocked: 30, ivt: 22 },
  { day: 19, fraud: 29, blocked: 22, ivt: 17 },
  { day: 21, fraud: 44, blocked: 36, ivt: 27 },
  { day: 23, fraud: 36, blocked: 28, ivt: 21 },
  { day: 25, fraud: 27, blocked: 20, ivt: 15 },
];

export const fraudDistribution = [
  { type: "Bots", count: 35000 },
  { type: "Click Farm", count: 28000 },
  { type: "Geo Spoof", count: 18000 },
  { type: "Data Center", count: 14000 },
  { type: "Hidden Ads", count: 9000 },
];

export const topFraudSources = [
  { name: "Source A", value: 28 },
  { name: "Source B", value: 24 },
  { name: "Source C", value: 19 },
  { name: "Source D", value: 16 },
  { name: "Source E", value: 13 },
];

export const fraudHotspots = [
  { country: "USA", code: "US", incidents: 42100, severity: "high" as const },
  { country: "Brazil", code: "BR", incidents: 31800, severity: "high" as const },
  { country: "UK", code: "GB", incidents: 17200, severity: "medium" as const },
  { country: "Russia", code: "RU", incidents: 28900, severity: "high" as const },
  { country: "China", code: "CN", incidents: 22400, severity: "medium" as const },
  { country: "India", code: "IN", incidents: 14600, severity: "medium" as const },
  { country: "Germany", code: "DE", incidents: 6200, severity: "low" as const },
  { country: "Australia", code: "AU", incidents: 3800, severity: "low" as const },
];

export type FraudIncident = {
  timestamp: string;
  campaignId: string;
  eventId: string;
  sourceId: string;
  trafficType: "Click" | "Impression" | "Conversion";
  reason: "High IVT" | "Bot Activity" | "Geo Spoof" | "Click Farm";
  location: string;
  ipAddress: string;
  status: "Blocked" | "Flagged" | "Investigating";
};

export const fraudIncidents: FraudIncident[] = [
  {
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_98234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    reason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    status: "Blocked",
  },
  {
    timestamp: "Oct 25 11:31:48",
    campaignId: "C_7812",
    eventId: "E_88234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    reason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    status: "Blocked",
  },
  {
    timestamp: "Oct 25 11:31:22",
    campaignId: "C_4421",
    eventId: "E_88231",
    sourceId: "S_209 (Net Y)",
    trafficType: "Impression",
    reason: "Bot Activity",
    location: "TX, USA",
    ipAddress: "198.51.100.7",
    status: "Blocked",
  },
  {
    timestamp: "Oct 25 11:30:51",
    campaignId: "C_5550",
    eventId: "E_88229",
    sourceId: "S_318 (Direct)",
    trafficType: "Click",
    reason: "Geo Spoof",
    location: "São Paulo, BR",
    ipAddress: "203.0.113.41",
    status: "Flagged",
  },
  {
    timestamp: "Oct 25 11:30:14",
    campaignId: "C_7812",
    eventId: "E_88227",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    reason: "Click Farm",
    location: "Mumbai, IN",
    ipAddress: "203.0.113.92",
    status: "Investigating",
  },
  {
    timestamp: "Oct 25 11:29:47",
    campaignId: "C_4421",
    eventId: "E_88224",
    sourceId: "S_127 (Net Z)",
    trafficType: "Click",
    reason: "High IVT",
    location: "Berlin, DE",
    ipAddress: "192.0.2.211",
    status: "Blocked",
  },
];

// ────────────────────────────── Identity Verification ──────────────────────────────

export type VerificationHistoryRow = {
  date: string;
  userId: string;
  type: "Phone & ID" | "Phone Only" | "Document Only";
  status: "Verified" | "Pending" | "Failed";
};

export const verificationHistory: VerificationHistoryRow[] = [
  {
    date: "2023-10-27",
    userId: "+1 (555) 123-4567",
    type: "Phone & ID",
    status: "Pending",
  },
  {
    date: "2023-10-27",
    userId: "+1 (555) 234-1198",
    type: "Phone & ID",
    status: "Verified",
  },
  {
    date: "2023-10-27",
    userId: "+1 (555) 884-5532",
    type: "Document Only",
    status: "Pending",
  },
  {
    date: "2023-10-26",
    userId: "+44 20 7946 0432",
    type: "Phone Only",
    status: "Verified",
  },
  {
    date: "2023-10-26",
    userId: "+91 99876 12345",
    type: "Phone & ID",
    status: "Failed",
  },
  {
    date: "2023-10-26",
    userId: "+1 (555) 432-9988",
    type: "Phone & ID",
    status: "Verified",
  },
];

export const verificationSuccessTrend = [
  { x: 30, success: 62 },
  { x: 40, success: 71 },
  { x: 50, success: 79 },
  { x: 60, success: 74 },
  { x: 70, success: 86 },
  { x: 80, success: 90 },
  { x: 90, success: 84 },
  { x: 100, success: 93 },
];

export const userStatusDistribution = [
  { name: "Verified", value: 612 },
  { name: "Pending", value: 184 },
  { name: "Failed", value: 73 },
];

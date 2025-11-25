// lib/demoData.ts - SEEDED DEMO DATA (PRO VERSION)

export const demoUser = {
  id: "demo-001",
  name: "Demo User",
  wallet: process.env.NEXT_PUBLIC_DEMO_USER_WALLET || "0xDemoWalletAddress",
};

export const demoSkills = [
  { id: 1, skill: "SQL", score: 87 },
  { id: 2, skill: "React", score: 78 },
  { id: 3, skill: "Blockchain", score: 92 },
];

export const demoQuestions = [
  { id: 1, q: "Explain Blockchain in one sentence", type: "short", maxScore: 40 },
  { id: 2, q: "Give a real world example of smart contracts", type: "short", maxScore: 30 },
  { id: 3, q: "List 3 advantages of decentralization", type: "list", maxScore: 30 },
];

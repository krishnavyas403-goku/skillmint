// lib/scoring.ts

export function scoreAnswers(answers: { [key: number]: string }) {
  let score = 0;
  Object.values(answers).forEach((ans) => {
    const len = ans.trim().length;
    if (len > 40) score += 35;
    else if (len > 20) score += 25;
    else if (len > 5) score += 15;
    else score += 5;
  });
  return Math.min(score, 100);
}

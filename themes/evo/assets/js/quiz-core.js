// Scoring for the AI 岗位体检 quiz (pure, unit-tested by scripts/test-quiz.mjs).
// Each statement belongs to one of the three task kinds from the 岗位体检 method:
//   alone    – AI can already do it on its own
//   assisted – AI can help, but a person has to check
//   human    – needs you in person, people's trust in you, or your accountability
// Answers: 0 = 很少, 1 = 一半, 2 = 大部分. Shares are 0..1 per bucket.
const BUCKETS = ["alone", "assisted", "human"];

export function score(questions, answers, { entry = false } = {}) {
  const shares = {};
  for (const b of BUCKETS) {
    const qs = questions.filter((q) => q.bucket === b);
    const total = qs.reduce((sum, q) => sum + (Number(answers[q.id]) || 0), 0);
    shares[b] = qs.length ? total / (qs.length * 2) : 0;
  }
  // High: most of the work is AI-doable and little of it needs you in person. Low: the human part dominates.
  let tier = "mid";
  if (shares.alone >= 0.6 && shares.human < 0.5) tier = "high";
  else if (shares.human >= 0.6 && shares.alone < 0.6) tier = "low";
  return { shares, tier, entry: Boolean(entry) };
}

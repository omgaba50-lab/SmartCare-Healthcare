// BMI helper (same logic as the original project)
export function calcBmi(profile) {
  const h = parseFloat(profile.height);
  const w = parseFloat(profile.weight);
  if (!h || !w) return "—";
  const m = h / 100;
  return (w / (m * m)).toFixed(1);
}

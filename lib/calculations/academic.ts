export type GradeBand = {
  min_percentage: number;
  max_percentage: number;
  grade: string;
};

export function calculatePercentage(obtained: number, maximum: number): number {
  if (maximum <= 0) return 0;
  return Number(((obtained / maximum) * 100).toFixed(2));
}

export function calculateTotalMarks(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

export function calculateWeightedScore(
  obtained: number,
  maximum: number,
  weightage: number
): number {
  if (maximum <= 0) return 0;
  return Number(((obtained / maximum) * weightage).toFixed(4));
}

export function calculateGrade(
  percentage: number,
  bands: GradeBand[]
): string {
  const match = bands
    .slice()
    .sort((a, b) => b.min_percentage - a.min_percentage)
    .find(band => percentage >= band.min_percentage && percentage <= band.max_percentage);

  return match?.grade ?? "F";
}

export function calculatePassFail(obtained: number, passing: number): "PASS" | "FAIL" {
  return obtained >= passing ? "PASS" : "FAIL";
}

export function calculateAttendancePercentage(
  present: number,
  absent: number,
  late = 0
): number {
  const total = present + absent + late;
  if (total === 0) return 0;
  return Number((((present + late) / total) * 100).toFixed(2));
}

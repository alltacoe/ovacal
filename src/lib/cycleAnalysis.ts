/**
 * cycleAnalysis.ts
 * Analyze multiple historical LMP dates to derive average cycle length,
 * standard deviation, and regularity classification.
 *
 * Scientific references:
 * - Fehring RJ, Schneider M, Raviele K. (2006). "Variability in the phases
 *   of the menstrual cycle." J Obstet Gynecol Neonatal Nurs. 35(3):376-84.
 * - Stanford JB, Mikolajczyk RT. (2002). "Methodological review of the
 *   application of survival analysis to time-to-pregnancy studies."
 */

import { differenceInDays, startOfDay } from "date-fns";

export type Regularity = "REGULAR" | "SLIGHTLY_IRREGULAR" | "IRREGULAR";

export interface CycleAnalysis {
  /** Length of each interval between consecutive LMP dates (days) */
  cycleLengths: number[];
  /** Average cycle length (rounded to nearest integer) */
  average: number;
  /** Average as a decimal (for precision in EDD calc) */
  averageExact: number;
  /** Population standard deviation in days */
  stdDev: number;
  /** Coefficient of Variation (%) = stdDev / average * 100 */
  cv: number;
  /**
   * Regularity classification based on Fehring (2006):
   *   REGULAR            : CV ≤ 10%
   *   SLIGHTLY_IRREGULAR : CV 10–20%
   *   IRREGULAR          : CV > 20%
   */
  regularity: Regularity;
  /** Number of cycle intervals with data (= lmpDates.length - 1) */
  dataPoints: number;
  /** Minimum cycle length observed */
  min: number;
  /** Maximum cycle length observed */
  max: number;
}

/**
 * Analyze an array of LMP dates (at least 2 required).
 * Sorts dates descending (newest first) and computes intervals.
 * Returns null if fewer than 2 dates provided.
 */
export function analyzeCycles(lmpDates: Date[]): CycleAnalysis | null {
  if (lmpDates.length < 2) return null;

  // Sort descending: newest first
  const sorted = [...lmpDates]
    .map((d) => startOfDay(d))
    .sort((a, b) => b.getTime() - a.getTime());

  // Compute interval between each consecutive pair
  const cycleLengths: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const interval = differenceInDays(sorted[i], sorted[i + 1]);
    if (interval > 0) cycleLengths.push(interval);
  }

  if (cycleLengths.length === 0) return null;

  const n = cycleLengths.length;
  const sum = cycleLengths.reduce((a, b) => a + b, 0);
  const averageExact = sum / n;
  const average = Math.round(averageExact);

  // Population standard deviation
  const variance =
    cycleLengths.reduce((acc, l) => acc + Math.pow(l - averageExact, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  // Coefficient of Variation
  const cv = averageExact > 0 ? (stdDev / averageExact) * 100 : 0;

  let regularity: Regularity;
  if (cv <= 10) regularity = "REGULAR";
  else if (cv <= 20) regularity = "SLIGHTLY_IRREGULAR";
  else regularity = "IRREGULAR";

  const min = Math.min(...cycleLengths);
  const max = Math.max(...cycleLengths);

  return {
    cycleLengths,
    average,
    averageExact,
    stdDev,
    cv,
    regularity,
    dataPoints: n,
    min,
    max,
  };
}

/** Returns the most recent LMP date from a list of LMP dates. */
export function getLatestLmp(lmpDates: Date[]): Date | null {
  if (lmpDates.length === 0) return null;
  return lmpDates
    .map((d) => startOfDay(d))
    .sort((a, b) => b.getTime() - a.getTime())[0];
}

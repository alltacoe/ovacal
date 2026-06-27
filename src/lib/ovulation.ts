/**
 * ovulation.ts
 * Evidence-based ovulation & pregnancy calculation logic.
 *
 * Scientific references:
 * - WHO Standard Days Method
 * - Naegele's Rule (ACOG, 1850, revised)
 * - Wilcox AJ et al. (1995) "Timing of Sexual Intercourse in Relation to Ovulation" NEJM
 * - Zeeva Fertility Research: Fertile window = OvulationDay -5 to +1
 * - ACOG Gestational Age Guidelines
 */

import {
  addDays,
  differenceInDays,
  startOfDay,
  format,
  isSameDay,
} from "date-fns";

export type FertilityLevel =
  | "PEAK"
  | "HIGH"
  | "MODERATE"
  | "MENSTRUATION"
  | "NONE";

export interface CycleResult {
  lmp: Date;
  cycleLength: number;
  ovulationDay: Date;
  fertileStart: Date;
  fertileEnd: Date;
  edd: Date; // Estimated Due Date (Naegele's adjusted)
  nextPeriod: Date;
}

export interface DayInfo {
  date: Date;
  fertilityLevel: FertilityLevel;
  label: string; // TH label for tooltip
  labelEn: string; // EN label
  cycleDay: number; // Day within cycle (1-based)
}

/**
 * Calculate one cycle's results.
 * Formula: Ovulation = LMP + (cycleLength - 14)
 * This uses the constant luteal phase assumption (14 days avg, Fehring 2006).
 * EDD = LMP + 280 + (cycleLength - 28) per adjusted Naegele's Rule.
 */
export function calculateCycle(
  lmp: Date,
  cycleLength: number
): CycleResult {
  const lmpDay = startOfDay(lmp);
  const ovulationDay = addDays(lmpDay, cycleLength - 14);

  // Fertile window: -5 to +1 days around ovulation
  // Based on: sperm survival up to 5 days, egg viability 12-24h (WHO/ACOG)
  const fertileStart = addDays(ovulationDay, -5);
  const fertileEnd = addDays(ovulationDay, 1);

  // Adjusted Naegele's Rule
  // Standard: LMP + 280 days (assumes 28-day cycle)
  // Adjusted: add (cycleLength - 28) for non-28-day cycles
  const edd = addDays(lmpDay, 280 + (cycleLength - 28));

  const nextPeriod = addDays(lmpDay, cycleLength);

  return {
    lmp: lmpDay,
    cycleLength,
    ovulationDay,
    fertileStart,
    fertileEnd,
    edd,
    nextPeriod,
  };
}

/**
 * Determine fertility level for a given date relative to ovulation.
 * Color-coding based on:
 * - PEAK: ovulation day (highest probability)
 * - HIGH: -2 to -1, +1 days (high probability)
 * - MODERATE: -5 to -3 days (moderate probability)
 * - MENSTRUATION: cycle days 1-5
 * - NONE: all other days
 */
export function getFertilityLevel(
  date: Date,
  cycleResult: CycleResult
): FertilityLevel {
  const d = startOfDay(date);
  const { lmp, ovulationDay, fertileStart, fertileEnd, nextPeriod } =
    cycleResult;

  const dayInCycle = differenceInDays(d, lmp) + 1;

  // Check if within this cycle range
  if (d < lmp || d >= nextPeriod) return "NONE";

  // Menstruation: days 1-5 of cycle
  if (dayInCycle >= 1 && dayInCycle <= 5) return "MENSTRUATION";

  if (!isSameDay(d, ovulationDay) && (d < fertileStart || d > fertileEnd))
    return "NONE";

  const diff = differenceInDays(d, ovulationDay);

  if (diff === 0) return "PEAK";
  if (diff >= -2 && diff <= 1) return "HIGH";
  if (diff >= -5 && diff <= -3) return "MODERATE";

  return "NONE";
}

/**
 * Get DayInfo for a specific date across multiple cycles.
 */
export function getDayInfo(
  date: Date,
  cycles: CycleResult[]
): DayInfo {
  const d = startOfDay(date);
  let level: FertilityLevel = "NONE";
  let cycleDay = 0;

  for (const cycle of cycles) {
    const dayInCycle = differenceInDays(d, cycle.lmp) + 1;
    if (dayInCycle >= 1 && dayInCycle <= cycle.cycleLength) {
      level = getFertilityLevel(d, cycle);
      cycleDay = dayInCycle;
      break;
    }
  }

  const labels = getFertilityLabels(level);
  return { date: d, fertilityLevel: level, label: labels.th, labelEn: labels.en, cycleDay };
}

function getFertilityLabels(level: FertilityLevel): { th: string; en: string } {
  switch (level) {
    case "PEAK":
      return { th: "วันไข่ตก — โอกาสสูงสุด", en: "Ovulation Day — Peak Fertility" };
    case "HIGH":
      return { th: "ช่วงมีบุตรง่าย — โอกาสสูง", en: "Fertile Window — High Fertility" };
    case "MODERATE":
      return { th: "ช่วงมีบุตรง่าย — โอกาสปานกลาง", en: "Fertile Window — Moderate" };
    case "MENSTRUATION":
      return { th: "วันประจำเดือน", en: "Menstruation" };
    default:
      return { th: "", en: "" };
  }
}

/**
 * Calculate gestational age from LMP.
 * Returns null if LMP is in the future (not pregnant yet).
 */
export function getGestationalAge(
  lmp: Date,
  today: Date = new Date()
): { weeks: number; days: number } | null {
  const lmpDay = startOfDay(lmp);
  const todayDay = startOfDay(today);
  const totalDays = differenceInDays(todayDay, lmpDay);
  if (totalDays < 0) return null;
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

/**
 * Generate multiple future cycles from the latest LMP.
 */
export function generateCycles(
  lmp: Date,
  cycleLength: number,
  count: number
): CycleResult[] {
  const results: CycleResult[] = [];
  let currentLmp = startOfDay(lmp);
  for (let i = 0; i < count; i++) {
    results.push(calculateCycle(currentLmp, cycleLength));
    currentLmp = addDays(currentLmp, cycleLength);
  }
  return results;
}

export { format };

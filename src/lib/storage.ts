/**
 * storage.ts — LocalStorage helpers
 */

import { CycleResult } from "./ovulation";

export interface SavedCalculation {
  id: string;
  savedAt: string; // ISO string
  lmpDate: string; // ISO string
  cycleLength: number;
  ovulationDay: string;
  fertileStart: string;
  fertileEnd: string;
  edd: string;
  inputMode: "quick" | "history";
  historyDates?: string[]; // ISO strings of past LMP dates
  avgCycleLength?: number;
}

const HISTORY_KEY = "ovucalc_history";
const LANG_KEY = "ovucalc_lang";
const MAX_HISTORY = 10;

export function saveCalculation(
  result: CycleResult,
  inputMode: "quick" | "history",
  historyDates?: Date[],
  avgCycleLength?: number
): void {
  try {
    const saved: SavedCalculation = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      lmpDate: result.lmp.toISOString(),
      cycleLength: result.cycleLength,
      ovulationDay: result.ovulationDay.toISOString(),
      fertileStart: result.fertileStart.toISOString(),
      fertileEnd: result.fertileEnd.toISOString(),
      edd: result.edd.toISOString(),
      inputMode,
      historyDates: historyDates?.map((d) => d.toISOString()),
      avgCycleLength,
    };

    const existing = getHistory();
    const updated = [saved, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // LocalStorage not available (SSR or private mode)
  }
}

export function getHistory(): SavedCalculation[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCalculation[];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}

export function getSavedLang(): "th" | "en" {
  try {
    const lang = localStorage.getItem(LANG_KEY);
    return lang === "en" ? "en" : "th";
  } catch {
    return "th";
  }
}

export function setSavedLang(lang: "th" | "en"): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

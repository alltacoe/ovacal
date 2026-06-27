"use client";
import { useState, useCallback } from "react";
import { startOfDay } from "date-fns";

export interface CycleEntry {
  id: string;
  date: Date | null;
}

export function useCycleHistory() {
  const [entries, setEntries] = useState<CycleEntry[]>([
    { id: "1", date: null },
    { id: "2", date: null },
  ]);

  const addEntry = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      { id: Date.now().toString(), date: null },
    ]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((e) => e.id !== id);
    });
  }, []);

  const updateEntry = useCallback((id: string, date: Date | null) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, date: date ? startOfDay(date) : null } : e))
    );
  }, []);

  const reset = useCallback(() => {
    setEntries([
      { id: "1", date: null },
      { id: "2", date: null },
    ]);
  }, []);

  // Valid dates sorted newest → oldest
  const validDates: Date[] = entries
    .map((e) => e.date)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => b.getTime() - a.getTime());

  return { entries, addEntry, removeEntry, updateEntry, reset, validDates };
}

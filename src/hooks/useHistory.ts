"use client";
import { useState, useCallback, useEffect } from "react";
import { getHistory, clearHistory as clearStorageHistory, SavedCalculation } from "@/lib/storage";

export function useHistory() {
  const [history, setHistory] = useState<SavedCalculation[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const refresh = useCallback(() => {
    setHistory(getHistory());
  }, []);

  const clearHistory = useCallback(() => {
    clearStorageHistory();
    setHistory([]);
  }, []);

  return { history, refresh, clearHistory };
}

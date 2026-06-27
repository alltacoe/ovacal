"use client";
import { useState, useEffect } from "react";
import { CycleEntry } from "@/hooks/useCycleHistory";
import { translations } from "@/lib/i18n";
import { differenceInDays, startOfDay, format } from "date-fns";

interface Props {
  entries: CycleEntry[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, date: Date | null) => void;
  lang: "th" | "en";
}

export default function CycleHistoryInput({
  entries,
  onAdd,
  onRemove,
  onUpdate,
  lang,
}: Props) {
  const t = translations[lang];

  // Sorted valid dates for computing intervals
  const validDates = entries
    .map((e) => e.date)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => b.getTime() - a.getTime());

  const getIntervalLabel = (entry: CycleEntry, entryIndex: number): string => {
    if (!entry.date) return "";
    const sorted = validDates;
    const pos = sorted.findIndex(
      (d) => d.getTime() === entry.date!.getTime()
    );
    if (pos < sorted.length - 1) {
      const diff = differenceInDays(sorted[pos], sorted[pos + 1]);
      if (diff > 0) return t.intervalLabel(diff);
    }
    return "";
  };

  const [maxDate, setMaxDate] = useState<string>("");

  useEffect(() => {
    const today = startOfDay(new Date());
    setMaxDate(format(today, "yyyy-MM-dd"));
  }, []);

  return (
    <div id="cycle-history-input" className="cycle-history-input">
      <p className="history-subtitle">{t.historySubtitle}</p>

      <div className="cycle-entries">
        {entries.map((entry, idx) => {
          const intervalLabel = getIntervalLabel(entry, idx);
          return (
            <div key={entry.id} className="cycle-entry">
              <div className="entry-header">
                <label className="entry-label" htmlFor={`cycle-date-${entry.id}`}>
                  {t.cycleLabel(idx + 1)}
                  {idx === 0 && (
                    <span className="latest-badge">
                      {lang === "th" ? "ล่าสุด" : "Latest"}
                    </span>
                  )}
                </label>
                {entries.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(entry.id)}
                    aria-label={`Remove cycle ${idx + 1}`}
                    id={`remove-cycle-${entry.id}`}
                  >
                    ✕
                  </button>
                )}
              </div>
              <input
                id={`cycle-date-${entry.id}`}
                type="date"
                className="date-input"
                max={maxDate}
                value={
                  entry.date ? format(entry.date, "yyyy-MM-dd") : ""
                }
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split("-").map(Number);
                    onUpdate(entry.id, new Date(y, m - 1, d));
                  } else {
                    onUpdate(entry.id, null);
                  }
                }}
              />
              {intervalLabel && (
                <span className="interval-label">↕ {intervalLabel}</span>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        id="add-cycle-btn"
        className="add-cycle-btn"
        onClick={onAdd}
      >
        {t.addCycle}
      </button>
    </div>
  );
}

"use client";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { SavedCalculation } from "@/lib/storage";
import { translations } from "@/lib/i18n";

interface Props {
  history: SavedCalculation[];
  lang: "th" | "en";
  onClear: () => void;
  onLoad: (calc: SavedCalculation) => void;
}

export default function HistoryPanel({ history, lang, onClear, onLoad }: Props) {
  const t = translations[lang];
  const locale = lang === "th" ? th : undefined;

  const fmt = (iso: string) =>
    format(new Date(iso), lang === "th" ? "d MMM yyyy" : "MMM d, yyyy", { locale });

  return (
    <div id="history-panel" className="history-panel">
      <div className="history-header">
        <h2 className="section-title">{t.historyPanelTitle}</h2>
        {history.length > 0 && (
          <button
            id="clear-history-btn"
            className="clear-history-btn"
            onClick={onClear}
          >
            {t.clearHistory}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="no-history">{t.noHistory}</p>
      ) : (
        <div className="history-list">
          {history.map((calc) => (
            <div key={calc.id} className="history-item">
              <div className="history-item-info">
                <span className="history-lmp">
                  LMP: {fmt(calc.lmpDate)}
                </span>
                <span className="history-ovulation">
                  🥚 {fmt(calc.ovulationDay)}
                </span>
                <span className="history-meta">
                  {calc.inputMode === "history" ? "📋" : "⚡"}{" "}
                  {calc.cycleLength} {t.days} •{" "}
                  {format(new Date(calc.savedAt), "dd/MM/yy HH:mm")}
                </span>
              </div>
              <button
                className="load-btn"
                id={`load-calc-${calc.id}`}
                onClick={() => onLoad(calc)}
              >
                {t.loadCalc}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

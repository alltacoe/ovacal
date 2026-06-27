"use client";
import { useState, useEffect } from "react";
import { format, startOfDay } from "date-fns";
import { translations } from "@/lib/i18n";
import { CycleAnalysis } from "@/lib/cycleAnalysis";
import { analyzeCycles, getLatestLmp } from "@/lib/cycleAnalysis";
import CycleHistoryInput from "./CycleHistoryInput";
import CycleSummaryBadge from "./CycleSummaryBadge";
import IrregularWarning from "../UI/IrregularWarning";
import { useCycleHistory } from "@/hooks/useCycleHistory";

interface Props {
  lang: "th" | "en";
  onCalculate: (params: {
    lmp: Date;
    cycleLength: number;
    inputMode: "quick" | "history";
    historyDates?: Date[];
    analysis?: CycleAnalysis;
  }) => void;
  onReset: () => void;
  hasResults: boolean;
}

export default function InputForm({
  lang,
  onCalculate,
  onReset,
  hasResults,
}: Props) {
  const t = translations[lang];

  const [mode, setMode] = useState<"quick" | "history">("quick");
  const [quickLmp, setQuickLmp] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [error, setError] = useState<string>("");

  const { entries, addEntry, removeEntry, updateEntry, reset: resetHistory, validDates } =
    useCycleHistory();

  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setToday(format(startOfDay(new Date()), "yyyy-MM-dd"));
  }, []);

  const analysis = validDates.length >= 2 ? analyzeCycles(validDates) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "quick") {
      if (!quickLmp) {
        setError(t.errorNoLmp);
        return;
      }
      const [y, m, d] = quickLmp.split("-").map(Number);
      const lmpDate = startOfDay(new Date(y, m - 1, d));
      onCalculate({ lmp: lmpDate, cycleLength, inputMode: "quick" });
    } else {
      if (validDates.length < 1) {
        setError(t.errorNoLmp);
        return;
      }
      if (validDates.length < 2) {
        setError(t.errorNeedTwoCycles);
        return;
      }
      const latestLmp = getLatestLmp(validDates)!;
      const effectiveCycleLength = analysis ? analysis.average : cycleLength;
      onCalculate({
        lmp: latestLmp,
        cycleLength: effectiveCycleLength,
        inputMode: "history",
        historyDates: validDates,
        analysis: analysis ?? undefined,
      });
    }
  };

  const handleReset = () => {
    setQuickLmp("");
    setCycleLength(28);
    setError("");
    resetHistory();
    onReset();
  };

  return (
    <div className="input-form-wrapper">
      <form id="calculator-form" onSubmit={handleSubmit} className="input-form" noValidate>
        {/* Mode Toggle */}
        <div className="mode-toggle" role="tablist" aria-label={t.inputMode}>
          <button
            type="button"
            role="tab"
            id="mode-quick-tab"
            aria-selected={mode === "quick"}
            className={`mode-btn ${mode === "quick" ? "active" : ""}`}
            onClick={() => { setMode("quick"); setError(""); }}
          >
            {t.modeQuick}
          </button>
          <button
            type="button"
            role="tab"
            id="mode-history-tab"
            aria-selected={mode === "history"}
            className={`mode-btn ${mode === "history" ? "active" : ""}`}
            onClick={() => { setMode("history"); setError(""); }}
          >
            {t.modeHistory}
          </button>
        </div>

        {/* Quick Mode */}
        {mode === "quick" && (
          <div id="quick-mode" className="mode-panel fade-in">
            <div className="field-group">
              <label className="field-label" htmlFor="lmp-input">
                {t.lmpLabel}
              </label>
              <input
                id="lmp-input"
                type="date"
                className="date-input"
                max={today}
                value={quickLmp}
                onChange={(e) => setQuickLmp(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="cycle-length-slider">
                {t.cycleLengthLabel}
              </label>
              <div className="slider-wrapper">
                <input
                  id="cycle-length-slider"
                  type="range"
                  min={21}
                  max={45}
                  step={1}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="cycle-slider"
                />
                <span className="slider-value">
                  {cycleLength} <span>{t.days}</span>
                </span>
              </div>
              <small className="field-hint">{t.cycleLengthHint}</small>
            </div>
          </div>
        )}

        {/* History Mode */}
        {mode === "history" && (
          <div id="history-mode" className="mode-panel fade-in">
            <CycleHistoryInput
              entries={entries}
              onAdd={addEntry}
              onRemove={removeEntry}
              onUpdate={updateEntry}
              lang={lang}
            />

            {analysis && <CycleSummaryBadge analysis={analysis} lang={lang} />}
            {analysis && <IrregularWarning analysis={analysis} lang={lang} />}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="form-error" role="alert" id="form-error">
            ⚠️ {error}
          </div>
        )}

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" id="calculate-btn" className="btn-primary">
            {t.calculate}
          </button>
          {hasResults && (
            <button
              type="button"
              id="reset-btn"
              className="btn-secondary"
              onClick={handleReset}
            >
              {t.reset}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

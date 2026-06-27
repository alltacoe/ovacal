"use client";
import { useState, useCallback } from "react";
import { startOfDay } from "date-fns";
import { CycleResult, generateCycles } from "@/lib/ovulation";
import { CycleAnalysis } from "@/lib/cycleAnalysis";
import { saveCalculation, SavedCalculation } from "@/lib/storage";
import InputForm from "@/components/Calculator/InputForm";
import ResultSummary from "@/components/Calculator/ResultSummary";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import HistoryPanel from "@/components/History/HistoryPanel";
import LanguageToggle from "@/components/UI/LanguageToggle";
import Disclaimer from "@/components/UI/Disclaimer";
import { useLang } from "@/hooks/useLang";
import { useHistory } from "@/hooks/useHistory";
import { translations } from "@/lib/i18n";

export default function Home() {
  const { lang, t, toggleLang } = useLang();
  const { history, refresh: refreshHistory, clearHistory } = useHistory();
  const [result, setResult] = useState<CycleResult | null>(null);
  const [cycles, setCycles] = useState<CycleResult[]>([]);
  const [isPregnant, setIsPregnant] = useState(false);

  const handleCalculate = useCallback(
    ({
      lmp,
      cycleLength,
      inputMode,
      historyDates,
      analysis,
    }: {
      lmp: Date;
      cycleLength: number;
      inputMode: "quick" | "history";
      historyDates?: Date[];
      analysis?: CycleAnalysis;
    }) => {
      const firstCycle = generateCycles(lmp, cycleLength, 1)[0];
      const allCycles = generateCycles(lmp, cycleLength, 3);
      setResult(firstCycle);
      setCycles(allCycles);

      // Detect if already pregnant (LMP in the past)
      const today = startOfDay(new Date());
      setIsPregnant(lmp <= today);

      // Save to history
      saveCalculation(firstCycle, inputMode, historyDates, analysis?.average);
      refreshHistory();

      // Scroll to results
      setTimeout(() => {
        document.getElementById("result-summary")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
    [refreshHistory]
  );

  const handleReset = useCallback(() => {
    setResult(null);
    setCycles([]);
    setIsPregnant(false);
  }, []);

  const handleLoadCalc = useCallback((calc: SavedCalculation) => {
    const lmp = startOfDay(new Date(calc.lmpDate));
    const allCycles = generateCycles(lmp, calc.cycleLength, 3);
    setResult(allCycles[0]);
    setCycles(allCycles);
    setIsPregnant(lmp <= startOfDay(new Date()));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="main-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-group">
            <span className="logo-icon">🌸</span>
            <div>
              <h1 className="app-name">{t.appName}</h1>
              <p className="app-tagline">{t.appTagline}</p>
            </div>
          </div>
          <LanguageToggle lang={lang} onToggle={toggleLang} />
        </div>
      </header>

      {/* Hero description */}
      <section className="hero-section">
        <p className="hero-desc">{t.appDesc}</p>
      </section>

      {/* Input Form */}
      <section className="form-section">
        <InputForm
          lang={lang}
          onCalculate={handleCalculate}
          onReset={handleReset}
          hasResults={!!result}
        />
      </section>

      {/* Results */}
      {result && (
        <>
          <ResultSummary result={result} lang={lang} isPregnant={isPregnant} />
          <CalendarGrid cycles={cycles} lang={lang} />
        </>
      )}

      {/* History */}
      <HistoryPanel
        history={history}
        lang={lang}
        onClear={clearHistory}
        onLoad={handleLoadCalc}
      />

      {/* Disclaimer */}
      <Disclaimer lang={lang} />
    </main>
  );
}

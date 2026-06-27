"use client";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { CycleResult } from "@/lib/ovulation";
import { getGestationalAge } from "@/lib/ovulation";
import { translations } from "@/lib/i18n";

interface Props {
  result: CycleResult;
  lang: "th" | "en";
  isPregnant?: boolean; // true if user knows they are already pregnant
}

export default function ResultSummary({ result, lang, isPregnant }: Props) {
  const t = translations[lang];
  const locale = lang === "th" ? th : undefined;

  const fmt = (d: Date) =>
    format(d, lang === "th" ? "d MMMM yyyy" : "MMMM d, yyyy", { locale });

  const gestationalAge = isPregnant ? getGestationalAge(result.lmp) : null;

  const cards = [
    {
      id: "ovulation-card",
      icon: "🥚",
      label: t.ovulationDay,
      value: fmt(result.ovulationDay),
      sub: null,
      accent: "card-peak",
    },
    {
      id: "fertile-window-card",
      icon: "🌸",
      label: t.fertileWindow,
      value: `${fmt(result.fertileStart)}`,
      sub: `${t.to} ${fmt(result.fertileEnd)}`,
      accent: "card-high",
    },
    {
      id: "edd-card",
      icon: "🤰",
      label: t.edd,
      value: fmt(result.edd),
      sub: `≈ 40 ${t.weeks}`,
      accent: "card-edd",
    },
    {
      id: "next-period-card",
      icon: "📅",
      label: t.nextPeriod,
      value: fmt(result.nextPeriod),
      sub: `${result.cycleLength} ${t.days}`,
      accent: "card-next",
    },
  ];

  return (
    <div id="result-summary" className="result-summary">
      <h2 className="results-title">{t.resultsTitle}</h2>

      <div className="result-cards">
        {cards.map((card) => (
          <div key={card.id} id={card.id} className={`result-card ${card.accent}`}>
            <span className="card-icon">{card.icon}</span>
            <span className="card-label">{card.label}</span>
            <strong className="card-value">{card.value}</strong>
            {card.sub && <span className="card-sub">{card.sub}</span>}
          </div>
        ))}
      </div>

      {/* Gestational Age — only shown if LMP is in the past */}
      {gestationalAge && (
        <div id="gestational-age-card" className="gestational-age-card">
          <span className="gest-icon">⏱</span>
          <div className="gest-info">
            <span className="gest-label">{t.gestationalAge}</span>
            <strong className="gest-value">
              {gestationalAge.weeks} {t.weeks} {gestationalAge.days} {t.daysShort}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}

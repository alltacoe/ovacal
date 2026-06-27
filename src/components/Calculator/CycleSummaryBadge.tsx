"use client";
import { CycleAnalysis } from "@/lib/cycleAnalysis";
import { translations } from "@/lib/i18n";

interface Props {
  analysis: CycleAnalysis;
  lang: "th" | "en";
}

const regularityColors = {
  REGULAR: "badge-green",
  SLIGHTLY_IRREGULAR: "badge-amber",
  IRREGULAR: "badge-red",
};

export default function CycleSummaryBadge({ analysis, lang }: Props) {
  const t = translations[lang];
  const color = regularityColors[analysis.regularity];

  const regularityLabel =
    analysis.regularity === "REGULAR"
      ? t.regular
      : analysis.regularity === "SLIGHTLY_IRREGULAR"
      ? t.slightlyIrregular
      : t.irregular;

  return (
    <div id="cycle-summary-badge" className="cycle-summary-badge">
      <div className="badge-main">
        <span className="badge-icon">📊</span>
        <span className="badge-text">
          {t.avgCycle}:{" "}
          <strong>
            {analysis.average} {t.days}
          </strong>
          {analysis.stdDev > 0 && (
            <span className="badge-sd">
              {" "}
              (±{analysis.stdDev.toFixed(1)})
            </span>
          )}
        </span>
      </div>
      <div className="badge-meta">
        <span className={`regularity-badge ${color}`}>{regularityLabel}</span>
        <span className="data-points">{t.dataFrom(analysis.dataPoints)}</span>
      </div>
      {analysis.cycleLengths.length > 0 && (
        <div className="cycle-lengths">
          {analysis.cycleLengths.map((len, i) => (
            <span key={i} className="cycle-chip">
              {len}
            </span>
          ))}
          <span className="cycle-chip-label">{t.daysShort}</span>
        </div>
      )}
    </div>
  );
}

"use client";
import { translations } from "@/lib/i18n";
import { CycleAnalysis } from "@/lib/cycleAnalysis";

interface Props {
  analysis: CycleAnalysis;
  lang: "th" | "en";
}

export default function IrregularWarning({ analysis, lang }: Props) {
  const t = translations[lang];
  if (analysis.regularity === "REGULAR") return null;

  const isHighlyIrregular = analysis.regularity === "IRREGULAR";

  return (
    <div
      id="irregular-warning"
      className={`irregular-warning ${isHighlyIrregular ? "highly-irregular" : "slightly-irregular"}`}
      role="alert"
    >
      <span className="warning-icon">{isHighlyIrregular ? "🔴" : "⚠️"}</span>
      <div className="warning-content">
        <strong>{t.warningTitle}</strong>
        <p>{t.warningBody}</p>
        <small>
          CV: {analysis.cv.toFixed(1)}% | SD: ±{analysis.stdDev.toFixed(1)}{" "}
          {t.daysShort}
        </small>
      </div>
    </div>
  );
}

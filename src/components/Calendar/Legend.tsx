"use client";
import { translations } from "@/lib/i18n";

interface Props {
  lang: "th" | "en";
}

export default function CalendarLegend({ lang }: Props) {
  const t = translations[lang];

  const items = [
    { color: "legend-peak", label: t.legendPeak },
    { color: "legend-high", label: t.legendHigh },
    { color: "legend-moderate", label: t.legendModerate },
    { color: "legend-menstruation", label: t.legendMenstruation },
  ];

  return (
    <div id="calendar-legend" className="calendar-legend">
      <span className="legend-title">{t.legend}:</span>
      <div className="legend-items">
        {items.map((item) => (
          <div key={item.color} className="legend-item">
            <span className={`legend-dot ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

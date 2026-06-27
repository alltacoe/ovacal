"use client";
import { useState } from "react";
import { DayInfo } from "@/lib/ovulation";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface Props {
  dayInfo: DayInfo;
  lang: "th" | "en";
  isToday: boolean;
}

const fertilityClasses = {
  PEAK: "day-peak",
  HIGH: "day-high",
  MODERATE: "day-moderate",
  MENSTRUATION: "day-menstruation",
  NONE: "",
};

export default function DayCell({ dayInfo, lang, isToday }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { date, fertilityLevel, label, labelEn } = dayInfo;
  const dayClass = fertilityClasses[fertilityLevel];
  const tooltipText = lang === "th" ? label : labelEn;
  const dayNumber = date.getDate();

  const handleInteraction = () => {
    if (tooltipText) setShowTooltip((v) => !v);
  };

  return (
    <div
      className={`day-cell ${dayClass} ${isToday ? "day-today" : ""}`}
      onMouseEnter={() => tooltipText && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={handleInteraction}
      tabIndex={tooltipText ? 0 : -1}
      onFocus={() => tooltipText && setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      role={tooltipText ? "button" : undefined}
      aria-label={tooltipText ? `${dayNumber}: ${tooltipText}` : undefined}
    >
      <span className="day-number">{dayNumber}</span>
      {fertilityLevel === "PEAK" && <span className="peak-dot" />}
      {showTooltip && tooltipText && (
        <div className="tooltip" role="tooltip">
          {tooltipText}
        </div>
      )}
    </div>
  );
}

"use client";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addMonths,
  startOfDay,
} from "date-fns";
import { CycleResult, getDayInfo } from "@/lib/ovulation";
import DayCell from "./DayCell";
import Legend from "./Legend";
import { translations } from "@/lib/i18n";

interface Props {
  cycles: CycleResult[];
  lang: "th" | "en";
}

export default function CalendarGrid({ cycles, lang }: Props) {
  const t = translations[lang];
  const today = startOfDay(new Date());

  // Show 3 months starting from the first cycle's LMP month
  const startMonth = cycles[0]?.lmp ? startOfMonth(cycles[0].lmp) : startOfMonth(today);
  const months = [0, 1, 2].map((i) => addMonths(startMonth, i));

  return (
    <div id="calendar-section" className="calendar-section">
      <h2 className="section-title">{t.calendarTitle}</h2>
      <Legend lang={lang} />
      <div className="calendar-months">
        {months.map((monthStart, mi) => {
          const monthEnd = endOfMonth(monthStart);
          const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
          const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
          const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

          return (
            <div key={mi} className="calendar-month">
              <h3 className="month-title">
                {t.months[monthStart.getMonth()]} {monthStart.getFullYear()}
              </h3>
              <div className="weekday-headers">
                {t.weekdays.map((wd) => (
                  <div key={wd} className="weekday-header">
                    {wd}
                  </div>
                ))}
              </div>
              <div className="day-grid">
                {days.map((day, di) => {
                  const isCurrentMonth = day.getMonth() === monthStart.getMonth();
                  const dayInfo = isCurrentMonth
                    ? getDayInfo(day, cycles)
                    : {
                        date: day,
                        fertilityLevel: "NONE" as const,
                        label: "",
                        labelEn: "",
                        cycleDay: 0,
                      };
                  return (
                    <div key={di} className={`day-wrapper ${!isCurrentMonth ? "day-outside" : ""}`}>
                      {isCurrentMonth ? (
                        <DayCell
                          dayInfo={dayInfo}
                          lang={lang}
                          isToday={isSameDay(day, today)}
                        />
                      ) : (
                        <div className="day-cell day-empty">
                          <span className="day-number">{day.getDate()}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

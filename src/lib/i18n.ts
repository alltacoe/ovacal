/**
 * i18n.ts — Thai / English translations
 */

export type Lang = "th" | "en";

export const translations = {
  th: {
    // App
    appName: "ไข่ตกคำนวณ",
    appTagline: "คำนวณวันไข่ตกและวันตั้งครรภ์",
    appDesc:
      "คำนวณวันไข่ตก ช่วงมีบุตรง่าย และวันคลอดโดยอิงทฤษฎีจากงานวิจัย (Evidence-Based)",

    // Input
    inputTitle: "ข้อมูลรอบเดือน",
    inputMode: "โหมดป้อนข้อมูล",
    modeQuick: "⚡ ด่วน",
    modeHistory: "📋 ย้อนหลัง",
    lmpLabel: "วันแรกของประจำเดือนล่าสุด",
    lmpPlaceholder: "เลือกวันที่",
    cycleLengthLabel: "ความยาวรอบเดือน (วัน)",
    cycleLengthHint: "ปกติ 21–35 วัน",
    historyTitle: "ประวัติรอบเดือน",
    historySubtitle: "ป้อนวันแรกของประจำเดือนในแต่ละรอบ (จากล่าสุดไปเก่าสุด)",
    addCycle: "+ เพิ่มรอบ",
    cycleLabel: (n: number) => `รอบที่ ${n}`,
    intervalLabel: (d: number) => `ห่าง ${d} วัน`,
    calculate: "คำนวณ",
    reset: "เริ่มใหม่",

    // Summary badge
    avgCycle: "ความยาวรอบเดือนเฉลี่ย",
    days: "วัน",
    regular: "สม่ำเสมอ",
    slightlyIrregular: "ค่อนข้างไม่สม่ำเสมอ",
    irregular: "ไม่สม่ำเสมอ",
    dataFrom: (n: number) => `จาก ${n} รอบ`,

    // Warning
    warningTitle: "รอบเดือนไม่สม่ำเสมอ",
    warningBody:
      "รอบเดือนของคุณมีความผันผวนค่อนข้างมาก ผลที่คำนวณเป็นเพียงการประมาณการ ควรใช้ร่วมกับการวัดอุณหภูมิร่างกาย (BBT) หรือแผ่นทดสอบ LH เพื่อความแม่นยำ",

    // Results
    resultsTitle: "ผลการคำนวณ",
    ovulationDay: "วันไข่ตก",
    fertileWindow: "ช่วงมีบุตรง่าย",
    edd: "วันคลอดโดยประมาณ",
    gestationalAge: "อายุครรภ์",
    nextPeriod: "รอบเดือนถัดไป",
    weeks: "สัปดาห์",
    daysShort: "วัน",
    weeksAgo: (w: number, d: number) => `${w} สัปดาห์ ${d} วัน`,
    to: "ถึง",
    peakDay: "วันโอกาสสูงสุด",

    // Calendar
    calendarTitle: "ปฏิทินรอบเดือน (3 รอบถัดไป)",
    legend: "คำอธิบาย",
    legendPeak: "วันไข่ตก",
    legendHigh: "ช่วงมีบุตรง่าย (สูง)",
    legendModerate: "ช่วงมีบุตรง่าย (ปานกลาง)",
    legendMenstruation: "ประจำเดือน",
    months: [
      "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
      "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
    ],
    weekdays: ["อา","จ","อ","พ","พฤ","ศ","ส"],

    // History
    historyPanelTitle: "ประวัติการคำนวณ",
    noHistory: "ยังไม่มีประวัติ",
    clearHistory: "ล้างประวัติ",
    loadCalc: "โหลด",

    // Disclaimer
    disclaimerText:
      "⚠️ ผลการคำนวณนี้เป็นการประมาณการโดยอิงทฤษฎีทางวิทยาศาสตร์เท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ หากมีข้อสงสัยควรปรึกษาแพทย์หรือผู้เชี่ยวชาญด้านการเจริญพันธุ์",
    researchRef: "อ้างอิง: WHO, ACOG, Fehring et al. (2006), Wilcox et al. (1995)",

    // Tooltip labels (from ovulation.ts)
    peak: "วันไข่ตก — โอกาสสูงสุด",
    high: "ช่วงมีบุตรง่าย — โอกาสสูง",
    moderate: "ช่วงมีบุตรง่าย — โอกาสปานกลาง",
    menstruation: "วันประจำเดือน",

    // Errors
    errorNoLmp: "กรุณาเลือกวันแรกของประจำเดือน",
    errorNeedTwoCycles: "กรุณาป้อนอย่างน้อย 2 รอบเพื่อคำนวณค่าเฉลี่ย",
    errorInvalidDate: "วันที่ไม่ถูกต้อง",
    errorFutureDate: "วันที่ต้องไม่อยู่ในอนาคต",
  },

  en: {
    appName: "OvuCalc",
    appTagline: "Ovulation & Pregnancy Calculator",
    appDesc:
      "Calculate ovulation day, fertile window, and due date based on evidence-based research.",

    inputTitle: "Cycle Information",
    inputMode: "Input Mode",
    modeQuick: "⚡ Quick",
    modeHistory: "📋 History",
    lmpLabel: "First day of last menstrual period",
    lmpPlaceholder: "Select date",
    cycleLengthLabel: "Cycle length (days)",
    cycleLengthHint: "Normal range: 21–35 days",
    historyTitle: "Cycle History",
    historySubtitle: "Enter the first day of each period (newest first)",
    addCycle: "+ Add cycle",
    cycleLabel: (n: number) => `Cycle ${n}`,
    intervalLabel: (d: number) => `${d} days apart`,
    calculate: "Calculate",
    reset: "Reset",

    avgCycle: "Average cycle length",
    days: "days",
    regular: "Regular",
    slightlyIrregular: "Slightly irregular",
    irregular: "Irregular",
    dataFrom: (n: number) => `from ${n} cycles`,

    warningTitle: "Irregular Cycle Detected",
    warningBody:
      "Your cycle shows significant variability. Results are estimates only. Consider combining with BBT tracking or LH tests for better accuracy.",

    resultsTitle: "Your Results",
    ovulationDay: "Ovulation Day",
    fertileWindow: "Fertile Window",
    edd: "Estimated Due Date",
    gestationalAge: "Gestational Age",
    nextPeriod: "Next Period",
    weeks: "weeks",
    daysShort: "days",
    weeksAgo: (w: number, d: number) => `${w} weeks ${d} days`,
    to: "to",
    peakDay: "Peak day",

    calendarTitle: "Cycle Calendar (next 3 cycles)",
    legend: "Legend",
    legendPeak: "Ovulation Day",
    legendHigh: "Fertile Window (High)",
    legendModerate: "Fertile Window (Moderate)",
    legendMenstruation: "Menstruation",
    months: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ],
    weekdays: ["Su","Mo","Tu","We","Th","Fr","Sa"],

    historyPanelTitle: "Calculation History",
    noHistory: "No history yet",
    clearHistory: "Clear history",
    loadCalc: "Load",

    disclaimerText:
      "⚠️ Results are estimates based on scientific models and are not medical advice. Consult a healthcare provider or fertility specialist for guidance.",
    researchRef: "References: WHO, ACOG, Fehring et al. (2006), Wilcox et al. (1995)",

    peak: "Ovulation Day — Peak Fertility",
    high: "Fertile Window — High Fertility",
    moderate: "Fertile Window — Moderate",
    menstruation: "Menstruation",

    errorNoLmp: "Please select the first day of your last period",
    errorNeedTwoCycles: "Please enter at least 2 cycles to calculate average",
    errorInvalidDate: "Invalid date",
    errorFutureDate: "Date cannot be in the future",
  },
} as const;

export type TranslationKey = keyof typeof translations.th;

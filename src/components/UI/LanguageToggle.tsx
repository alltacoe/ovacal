"use client";
import { translations } from "@/lib/i18n";

interface Props {
  lang: "th" | "en";
  onToggle: () => void;
}

export default function LanguageToggle({ lang, onToggle }: Props) {
  return (
    <button
      id="lang-toggle"
      onClick={onToggle}
      className="lang-toggle"
      aria-label="Toggle language"
      title={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
    >
      <span className={lang === "th" ? "active" : ""}>TH</span>
      <span className="divider">|</span>
      <span className={lang === "en" ? "active" : ""}>EN</span>
    </button>
  );
}

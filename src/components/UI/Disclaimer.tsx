"use client";
import { translations } from "@/lib/i18n";

interface Props {
  lang: "th" | "en";
}

export default function Disclaimer({ lang }: Props) {
  const t = translations[lang];
  return (
    <footer id="disclaimer" className="disclaimer">
      <p>{t.disclaimerText}</p>
      <p className="research-ref">{t.researchRef}</p>
    </footer>
  );
}

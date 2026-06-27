"use client";
import { useState, useCallback, useEffect } from "react";
import { Lang, translations } from "@/lib/i18n";
import { getSavedLang, setSavedLang } from "@/lib/storage";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("th");

  useEffect(() => {
    setLangState(getSavedLang());
  }, []);

  const t = translations[lang];

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "th" ? "en" : "th";
      setSavedLang(next);
      return next;
    });
  }, []);

  return { lang, t, toggleLang };
}

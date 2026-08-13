import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "@/locales/en";
import { ur } from "@/locales/ur";

export type Language = "en" | "ur";

const dictionaries = { en, ur };

type Ctx = {
  lang: Language;
  setLang: (l: Language) => void;
  dir: "ltr" | "rtl";
  isUrdu: boolean;
  t: (path: string) => string;
  /** Always returns the Urdu string — used for bilingual accents. */
  tUr: (path: string) => string;
  tList: (path: string) => string[];
};

const LanguageContext = createContext<Ctx | null>(null);

function resolve(dict: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Site is English-only; Urdu is used as decorative accents alongside English.
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
  }, []);

  const t = useCallback(
    (path: string) => {
      const value = resolve(dictionaries[lang], path) ?? resolve(dictionaries.en, path);
      return typeof value === "string" ? value : path;
    },
    [lang],
  );

  const tUr = useCallback((path: string) => {
    const value = resolve(dictionaries.ur, path);
    return typeof value === "string" ? value : "";
  }, []);

  const tList = useCallback(
    (path: string) => {
      const value = resolve(dictionaries[lang], path) ?? resolve(dictionaries.en, path);
      return Array.isArray(value) ? (value as string[]) : [];
    },
    [lang],
  );

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      dir: lang === "ur" ? "rtl" : "ltr",
      isUrdu: lang === "ur",
      t,
      tUr,
      tList,
    }),
    [lang, setLang, t, tUr, tList],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Picks the right field of a bilingual record. */
export function useBilingual() {
  const { isUrdu } = useLanguage();
  return useCallback(
    (enValue: string, urValue?: string) => (isUrdu && urValue ? urValue : enValue),
    [isUrdu],
  );
}

export const locales = ["fa", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";
export const rtlLocales: Locale[] = ["fa", "ar"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: string): "rtl" | "ltr" {
  return rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
}

export const localeNames: Record<Locale, string> = {
  fa: "FA",
  en: "EN",
  ar: "AR",
};

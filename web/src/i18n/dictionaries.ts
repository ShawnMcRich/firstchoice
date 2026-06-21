import "server-only";
import type { Locale } from "./config";

export interface Dictionary {
  meta: { homeTitle: string; homeDesc: string };
  nav: { buy: string; rent: string; areas: string; intl: string; about: string; submit: string; consult: string };
  hero: {
    eyebrow: string; title: string; titleEm: string; titleAfter: string; en: string; lead: string;
    tabs: { buy: string; rent: string; full: string };
    searchPlaceholder: string; search: string; citiesLabel: string; tag: string;
  };
  cities: string[];
  categories: { eyebrow: string; title: string; more: string; items: { t: string; d: string }[] };
  featured: {
    eyebrow: string; title: string; more: string; details: string;
    items: { loc: string; title: string; price: string; unit: string; badge: string; brass?: string; specs: string[] }[];
  };
  diplomatic: { eyebrow: string; title: string; en: string; items: string[]; cta: string };
  trust: { stats: { n: string; l: string }[]; statement: string; aboutCta: string };
  footer: { tagline: string; services: string; areas: string; contactT: string; rights: string };
  contact: { phone: string; phoneHref: string; mobile: string; mobileHref: string; faxLabel: string; fax: string; email: string; web: string; address: string; postal: string };
}

const dictionaries = {
  fa: () => import("@/messages/fa.json").then((m) => m.default as Dictionary),
  en: () => import("@/messages/en.json").then((m) => m.default as Dictionary),
  ar: () => import("@/messages/ar.json").then((m) => m.default as Dictionary),
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (dictionaries[locale] ?? dictionaries.fa)();
}

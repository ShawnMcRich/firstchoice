import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getFeatured } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";
import type { ReactNode } from "react";

const HERO_IMG = "/img/pars-tower.webp";
const FEATURED_IMG = [
  "/img/placeholders/apartment.webp",
  "/img/placeholders/tower.webp",
  "/img/placeholders/penthouse.webp",
];

export const revalidate = 300;

const BAND: Record<string, string> = {
  fa: "از قلب تهران، تا سراسر ایران.",
  en: "From the heart of Tehran, to all of Iran.",
  ar: "من قلب طهران، إلى كل إيران.",
};

// Practical, options-filled hero — transaction tabs + property-type tiles (locale-aware).
type HeroTile = { label: string; icon: string; path: string };
const HERO: Record<string, { tabs: { label: string; tx: string }[]; types: HeroTile[] }> = {
  fa: {
    tabs: [
      { label: "خرید و فروش", tx: "sale" },
      { label: "رهن و اجاره", tx: "rent" },
      { label: "اجارهٔ کوتاه‌مدت", tx: "shortTerm" },
    ],
    types: [
      { label: "آپارتمان مسکونی", icon: "apartment", path: "/search?propertyType=apartment" },
      { label: "آپارتمان اداری", icon: "office", path: "/search?propertyType=officeDeed" },
      { label: "خانه و ویلا", icon: "villa", path: "/search?propertyType=villa" },
      { label: "مغازه و تجاری", icon: "shop", path: "/search?propertyType=shop" },
      { label: "برج و مستغلات", icon: "tower", path: "/search?propertyType=tower" },
      { label: "زمین و کلنگی", icon: "land", path: "/search?propertyType=land" },
    ],
  },
  en: {
    tabs: [
      { label: "Rent", tx: "rent" },
      { label: "Short-term", tx: "shortTerm" },
      { label: "Furnished", tx: "rent" },
    ],
    types: [
      { label: "Furnished apartments", icon: "apartment", path: "/search?propertyType=apartment" },
      { label: "Short-term stays", icon: "clock", path: "/search?transactionType=shortTerm" },
      { label: "Villas to rent", icon: "villa", path: "/search?propertyType=villa" },
      { label: "Penthouses", icon: "tower", path: "/search?propertyType=penthouse" },
      { label: "Offices to rent", icon: "office", path: "/search?propertyType=officeDeed" },
      { label: "Relocation", icon: "globe", path: "/diplomatic" },
    ],
  },
  ar: {
    tabs: [
      { label: "إيجار", tx: "rent" },
      { label: "إيجار قصير", tx: "shortTerm" },
      { label: "مفروش", tx: "rent" },
    ],
    types: [
      { label: "شقق مفروشة", icon: "apartment", path: "/search?propertyType=apartment" },
      { label: "إقامات قصيرة", icon: "clock", path: "/search?transactionType=shortTerm" },
      { label: "فلل للإيجار", icon: "villa", path: "/search?propertyType=villa" },
      { label: "بنتهاوس", icon: "tower", path: "/search?propertyType=penthouse" },
      { label: "مكاتب للإيجار", icon: "office", path: "/search?propertyType=officeDeed" },
      { label: "إسكان دبلوماسي", icon: "globe", path: "/diplomatic" },
    ],
  },
};

function TypeIcon({ k }: { k: string }) {
  const paths: Record<string, ReactNode> = {
    apartment: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M7 7h2M11 7h2M15 7h2M7 11h2M11 11h2M15 11h2M7 15h2M15 15h2" /><path d="M10 21v-4h4v4" /></>,
    office: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 3v18M16 3v18M4 9h16M4 15h16" /></>,
    villa: <><path d="M3 11l9-7 9 7" /><path d="M5 10v11h14V10" /><path d="M10 21v-6h4v6" /></>,
    shop: <><path d="M4 8l1.4-4h13.2L20 8z" /><path d="M5 8v13h14V8" /><path d="M9 21v-6h6v6" /></>,
    tower: <><rect x="7" y="2" width="10" height="20" rx="1" /><path d="M10 6h1M13 6h1M10 9h1M13 9h1M10 12h1M13 12h1" /><path d="M10 22v-5h4v5" /></>,
    land: <><path d="M3 20h18" /><path d="M12 20V9" /><path d="M12 11c-3 0-5-2-5-5 3 0 5 2 5 5z" /><path d="M12 13c3 0 5-2 5-5-3 0-5 2-5 5z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[k] ?? paths.apartment}
    </svg>
  );
}

// SEO neighborhood-link blocks (like delta.ir) — premium north-Tehran areas.
const TEHRAN: Record<string, string> = { fa: "تهران", en: "Tehran", ar: "طهران" };
const SEO: Record<string, { title: string; tx: string; hoods: string[] }[]> = {
  fa: [
    { title: "خرید ملک در", tx: "sale", hoods: ["جردن", "سعادت‌آباد", "ظفر", "شهرک غرب", "میرداماد", "الهیه", "قیطریه", "ونک", "زعفرانیه", "مرزداران", "پاسداران", "دروس", "ولنجک", "فرمانیه", "نیاوران", "امانیه"] },
    { title: "اجاره ملک در", tx: "rent", hoods: ["جردن", "ظفر", "میرداماد", "ونک", "نیاوران", "ولنجک", "زعفرانیه", "الهیه", "فرمانیه", "قیطریه", "پاسداران", "دروس", "امانیه", "سعادت‌آباد", "شهرک غرب", "اندرزگو"] },
  ],
  en: [
    { title: "Rentals in", tx: "rent", hoods: ["Jordan", "Elahieh", "Zaferanieh", "Niavaran", "Farmanieh", "Velenjak", "Qeytarieh", "Pasdaran", "Darrous", "Vanak", "Mirdamad", "Amanieh", "Saadat Abad", "Andarzgou", "Mahmoudieh", "Zafar"] },
    { title: "Short-term stays in", tx: "shortTerm", hoods: ["Jordan", "Elahieh", "Zaferanieh", "Niavaran", "Farmanieh", "Velenjak", "Qeytarieh", "Vanak"] },
  ],
  ar: [
    { title: "إيجار في", tx: "rent", hoods: ["جردن", "الهیه", "زعفرانیه", "نیاوران", "فرمانیه", "ولنجک", "قیطریه", "پاسداران", "دروس", "ونک", "میرداماد", "امانیه", "سعادت‌آباد", "اندرزگو"] },
    { title: "إقامات قصيرة في", tx: "shortTerm", hoods: ["جردن", "الهیه", "زعفرانیه", "نیاوران", "فرمانیه", "ولنجک"] },
  ],
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const featured = await getFeatured(locale);
  const L = (p: string) => `/${locale}${p}`;
  const hx = HERO[locale] ?? HERO.fa;
  const seo = SEO[locale] ?? SEO.fa;
  const tehran = TEHRAN[locale] ?? "تهران";

  return (
    <>
      {/* practical hero — search + property-type tiles */}
      <section className="phero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="phero__bg" src={HERO_IMG} alt="" />
        <div className="wrap">
          <div className="phero__head">
            <p className="phero__motto">{t.hero.motto}</p>
            <h1 className="phero__h1">
              {t.hero.title} <em>{t.hero.titleEm}</em>{t.hero.titleAfter}
            </h1>
            <p className="phero__sub">{t.hero.lead}</p>
          </div>
          <div className="psearch">
            <div className="psearch__tabs">
              {hx.tabs.map((tb, i) => (
                <Link key={tb.label} className={i === 0 ? "on" : ""} href={L(`/search?transactionType=${tb.tx}`)}>{tb.label}</Link>
              ))}
            </div>
            <form className="psearch__row" action={L("/search")}>
              <input type="text" name="q" placeholder={t.hero.searchPlaceholder} aria-label={t.hero.search} />
              <button className="btn btn--brass" type="submit">{t.hero.search}</button>
            </form>
          </div>
          <div className="phero__cta">
            <Link className="btn btn--brass" href={L("/submit")}>{t.nav.submit}</Link>
            <Link className="btn btn--lite" href={L("/request")}>{t.nav.request}</Link>
          </div>
          <div className="ptypes">
            {hx.types.map((ty) => (
              <Link key={ty.label} className="ptype" href={L(ty.path)}>
                <span className="ptype__ic"><TypeIcon k={ty.icon} /></span>
                <span className="ptype__lbl">{ty.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* featured */}
      <section>
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">{t.featured.eyebrow}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{t.featured.title}</h2>
            </div>
            <Link className="more" href={L("/search")}>{t.featured.more} →</Link>
          </div>
          <div className="grid3">
            {featured.length > 0
              ? featured.map((item) => (
                  <ListingCard key={item.id} item={item} locale={locale} detailsLabel={t.featured.details} />
                ))
              : t.featured.items.map((f, i) => (
              <article className="card" key={f.title}>
                <div className="card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FEATURED_IMG[i]} alt="" />
                  <span className="badge badge--type">{f.badge}</span>
                  {f.brass ? <span className="badge badge--brass">{f.brass}</span> : null}
                </div>
                <div className="card__body">
                  <div className="card__loc">{f.loc}</div>
                  <h3 className="card__title">{f.title}</h3>
                  <div className="card__price">
                    {f.price} <span>{f.unit}</span>
                  </div>
                  <div className="card__specs">
                    {f.specs.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="card__foot">
                    <span />
                    <Link className="card__link" href={L("/listing")}>{t.featured.details} →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* diplomatic teaser — foreigners only; hidden on the Persian home */}
      {locale !== "fa" && (
        <section className="diplo">
          <div className="wrap">
            <span className="eyebrow">{t.diplomatic.eyebrow}</span>
            <h2 className="h2" style={{ color: "var(--ivory)", margin: "18px 0 14px", maxWidth: "22ch" }}>
              {t.diplomatic.title}
            </h2>
            <ul style={{ maxWidth: "60ch" }}>
              {t.diplomatic.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <Link className="btn btn--brass" href={L("/diplomatic")}>{t.diplomatic.cta}</Link>
          </div>
        </section>
      )}

      {/* Tehran atmospheric band */}
      <section className="tehranband">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/tehran-aerial.webp" alt="" />
        <div className="wrap">
          <p>{BAND[locale]}</p>
        </div>
      </section>

      {/* SEO neighborhood links (delta-style) */}
      <section className="seo">
        <div className="wrap">
          {seo.map((b) => (
            <div className="seo__block" key={b.title}>
              <h3 className="seo__h">{b.title} <span>{tehran}</span></h3>
              <div className="seo__links">
                {b.hoods.map((h) => (
                  <Link key={h} href={L(`/search?transactionType=${b.tx}&q=${encodeURIComponent(h)}`)}>{b.title} {h}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* trust strip */}
      <section className="trust">
        <div className="wrap">
          <div className="trust__stats">
            {t.trust.stats.map((s) => (
              <div key={s.l}>
                <b>{s.n}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 400 }}>
            <p style={{ fontSize: 15, color: "rgba(246,242,234,.82)", marginBottom: 16 }}>{t.trust.statement}</p>
            <Link className="btn btn--ghost" href={L("/about")} style={{ borderColor: "var(--accent-2)", color: "var(--ivory)" }}>
              {t.trust.aboutCta} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

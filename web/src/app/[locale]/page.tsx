import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getFeatured } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";

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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const featured = await getFeatured(locale);
  const L = (p: string) => `/${locale}${p}`;

  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="hero__text">
          <p className="hero__motto">{t.hero.motto}</p>
          <h1>
            {t.hero.title}
            <br />
            <em>{t.hero.titleEm}</em>
            {t.hero.titleAfter}
          </h1>
          <p className="hero__lead">{t.hero.lead}</p>
          <div className="qs">
            <div className="qs__tabs">
              <Link className="on" href={L("/search")}>{t.hero.tabs.buy}</Link>
              <Link href={L("/search")}>{t.hero.tabs.rent}</Link>
              <Link href={L("/search")}>{t.hero.tabs.full}</Link>
            </div>
            <div className="qs__row">
              <input type="text" placeholder={t.hero.searchPlaceholder} aria-label={t.hero.search} />
              <Link className="btn btn--brass" href={L("/search")}>{t.hero.search}</Link>
            </div>
          </div>
          <div className="hero__hoods">
            <b>{t.hero.citiesLabel}</b>
            {t.cities.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className="sep">·</span>}
                <Link href={L("/search")}>{c}</Link>
              </span>
            ))}
          </div>
        </div>
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMG} alt="" />
          <div className="hero__tag">
            <span className="dot" />
            {t.hero.tag}
          </div>
        </div>
      </section>

      {/* categories / offers */}
      <section>
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">{t.categories.eyebrow}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{t.categories.title}</h2>
            </div>
            <Link className="more" href={L("/search")}>{t.categories.more} →</Link>
          </div>
          <div className="hoods">
            {t.categories.items.map((c) => (
              <Link key={c.t} className="hood" href={L("/search")}>
                <h4>{c.t} <i>→</i></h4>
                <p>{c.d}</p>
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

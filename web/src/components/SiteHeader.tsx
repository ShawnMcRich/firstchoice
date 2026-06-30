import Link from "next/link";
import { Brand } from "./Brand";
import { locales, localeNames, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const foreign = locale !== "fa";
  const links = foreign ? (
    <>
      <Link href={`/${locale}/search?transactionType=rent`}>{dict.nav.rent}</Link>
      <Link href={`/${locale}/search?transactionType=shortTerm`}>{dict.nav.shortTerm}</Link>
      <Link href={`/${locale}/request`}>{dict.nav.request}</Link>
      <Link href={`/${locale}/diplomatic`}>{dict.nav.intl}</Link>
      <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
      <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
    </>
  ) : (
    <>
      <Link href={`/${locale}`}>{dict.nav.home}</Link>
      <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
      <Link href={`/${locale}/request`}>{dict.nav.request}</Link>
      <Link href={`/${locale}/diplomatic`}>{dict.nav.intl}</Link>
      <Link href={`/${locale}/valuation`}>{dict.nav.valuation}</Link>
      <Link href={`/${locale}/cooperation`}>{dict.nav.cooperation}</Link>
      <Link href={`/${locale}/careers`}>{dict.nav.careers}</Link>
      <Link href={`/${locale}/news`}>{dict.nav.news}</Link>
      <Link href={`/${locale}/contact`}>{dict.nav.contact}</Link>
    </>
  );
  const num = (n: string) => <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{n}</span>;
  const tel = dict.contact.phoneHrefs[0];
  const telLabel = dict.contact.phones[0];

  return (
    <header className="nav">
      <div className="wrap">
        <Brand href={`/${locale}`} locale={locale} />
        <nav className="menu">{links}</nav>
        <div className="nav__right">
          <Link className="nav__cta" href={`/${locale}/submit`}>{dict.nav.submit}</Link>
          <a className="nav__tel" href={`tel:${tel}`} aria-label={dict.nav.consult}>
            <PhoneIcon />
            {num(telLabel)}
          </a>
          <span className="lang">
            {locales.map((l) => (
              <Link key={l} href={`/${l}`} className={l === locale ? "on" : ""}>
                {localeNames[l]}
              </Link>
            ))}
          </span>
          <details className="mnav">
            <summary aria-label={dict.nav.consult}><span className="burger" /></summary>
            <div className="mnav__panel">
              <nav className="mnav__links">{links}</nav>
              <Link className="nav__cta mnav__cta" href={`/${locale}/submit`}>{dict.nav.submit}</Link>
              <div className="mnav__tel">
                <a href={`tel:${tel}`}><PhoneIcon />{num(telLabel)}</a>
                <a href={`tel:${dict.contact.mobileHref}`}><PhoneIcon />{num(dict.contact.mobile)}</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Brand } from "./Brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Brand href={`/${locale}`} reversed />
            <p className="foot__intro">{dict.footer.tagline}</p>
          </div>
          <div>
            <h6>{dict.footer.services}</h6>
            <Link href={`/${locale}/search`}>{dict.nav.buy}</Link>
            <Link href={`/${locale}/search`}>{dict.nav.rent}</Link>
            <Link href={`/${locale}/submit`}>{dict.nav.submit}</Link>
            <Link href={`/${locale}/diplomatic`}>{dict.nav.intl}</Link>
          </div>
          <div>
            <h6>{dict.footer.areas}</h6>
            {dict.cities.slice(0, 4).map((c) => (
              <Link key={c} href={`/${locale}/search`}>{c}</Link>
            ))}
          </div>
          <div>
            <h6>{dict.footer.contactT}</h6>
            <p>{dict.contact.address}</p>
            <p>{dict.contact.postal}</p>
            <a href={`tel:${dict.contact.phoneHref}`}><span dir="ltr" style={{ unicodeBidi: "isolate" }}>{dict.contact.phone}</span></a>
            <p>{dict.contact.faxLabel}: <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{dict.contact.fax}</span></p>
            <a href={`mailto:${dict.contact.email}`}>{dict.contact.email}</a>
            <a href={`https://${dict.contact.web}`}>{dict.contact.web}</a>
          </div>
        </div>
        <div className="foot__bot">
          <span>{dict.footer.rights}</span>
          <span>EN / FA / AR</span>
        </div>
      </div>
    </footer>
  );
}

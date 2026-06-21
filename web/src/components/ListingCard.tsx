import Link from "next/link";
import type { CardListing } from "@/lib/listings";
import type { Locale } from "@/i18n/config";

const featuredLabel: Record<Locale, string> = { fa: "ویژه", en: "Featured", ar: "مميّز" };

export function ListingCard({
  item,
  locale,
  detailsLabel,
}: {
  item: CardListing;
  locale: Locale;
  detailsLabel: string;
}) {
  return (
    <article className="card">
      <div className="card__media">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} />
        ) : null}
        {item.badge ? <span className="badge badge--type">{item.badge}</span> : null}
        {item.featured ? <span className="badge badge--brass">{featuredLabel[locale]}</span> : null}
      </div>
      <div className="card__body">
        <div className="card__loc">{item.loc}</div>
        <h3 className="card__title">{item.title}</h3>
        <div className="card__price">
          {item.price} <span>{item.unit}</span>
        </div>
        {item.specs.length > 0 ? (
          <div className="card__specs">
            {item.specs.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        ) : null}
        <div className="card__foot">
          <span />
          <Link className="card__link" href={item.href}>
            {detailsLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}

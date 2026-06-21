import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getListingById } from "@/lib/listings";
import { amenityOptions, propertyTypeOptions, deedTypeOptions } from "@/collections/options";

export const dynamic = "force-dynamic";

const PHONE = "+982122041212";
const TXB: Record<string, Record<Locale, string>> = {
  sale: { fa: "فروش", en: "For sale", ar: "للبيع" },
  rent: { fa: "رهن و اجاره", en: "Rent", ar: "إيجار" },
  fullDeposit: { fa: "رهن کامل", en: "Full deposit", ar: "رهن كامل" },
  swap: { fa: "معاوضه", en: "Swap", ar: "مقايضة" },
  partnership: { fa: "مشارکت در ساخت", en: "Partnership", ar: "مشاركة" },
};
const LD: Record<Locale, Record<string, string>> = {
  fa: { home: "خانه", area: "متر", beds: "خواب", baths: "سرویس", floor: "طبقه", year: "سال ساخت", amen: "امکانات", specs: "مشخصات", map: "موقعیت روی نقشه", mapNote: "نقشهٔ نشان — موقعیت تقریبی؛ آدرس دقیق پس از هماهنگی.", call: "تماس تلفنی", wa: "واتساپ", tg: "تلگرام", visit: "درخواست بازدید", type: "نوع ملک", deed: "نوع سند", code: "کد ملک", perMeter: "هر متر" },
  en: { home: "Home", area: "m²", beds: "beds", baths: "baths", floor: "Floor", year: "Built", amen: "Amenities", specs: "Specifications", map: "Location", mapNote: "Neshan map — approximate; exact address after coordination.", call: "Call", wa: "WhatsApp", tg: "Telegram", visit: "Request a viewing", type: "Type", deed: "Deed", code: "Ref", perMeter: "per m²" },
  ar: { home: "الرئيسية", area: "م²", beds: "غرف", baths: "حمام", floor: "الطابق", year: "سنة البناء", amen: "المرافق", specs: "المواصفات", map: "الموقع", mapNote: "خريطة نشان — تقريبية؛ العنوان الدقيق بعد التنسيق.", call: "اتصال", wa: "واتساب", tg: "تليجرام", visit: "طلب معاينة", type: "النوع", deed: "السند", code: "الرمز", perMeter: "للمتر" },
};

export default async function ListingPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const doc = await getListingById(id, locale);
  if (!doc || doc.status !== "published") notFound();

  const intl = locale === "en" ? "en-US" : locale === "ar" ? "ar-EG" : "fa-IR";
  const t = LD[locale];
  const g = <T,>(k: string) => doc[k] as T | undefined;
  const fmt = (n?: number) => (typeof n === "number" ? n.toLocaleString(intl) : "");
  const labelOf = (opts: { label: string; value: string }[], v?: string) => opts.find((o) => o.value === v)?.label ?? v ?? "";

  const tx = g<string>("transactionType") ?? "sale";
  const isRent = tx === "rent" || tx === "fullDeposit";
  const images = (g<Array<{ url?: string; sizes?: { hero?: { url?: string }; card?: { url?: string } } }>>("images") ?? [])
    .map((m) => m?.sizes?.hero?.url ?? m?.sizes?.card?.url ?? m?.url)
    .filter(Boolean) as string[];
  const amenities = (g<string[]>("amenities") ?? []).map((v) => labelOf(amenityOptions, v));
  const area = g<number>("area");
  const price = g<number>("price");
  const perMeter = price && area ? Math.round(price / area) : undefined;
  const loc = [g<string>("city"), g<string>("neighborhood")].filter(Boolean).join(" · ");

  const specs = ([
    [t.type, labelOf(propertyTypeOptions, g<string>("propertyType"))],
    [t.area, area ? `${fmt(area)} ${t.area}` : ""],
    [t.beds, fmt(g<number>("bedrooms"))],
    [t.baths, fmt(g<number>("bathrooms"))],
    [t.floor, g<number>("floor") ? `${fmt(g<number>("floor"))}${g<number>("totalFloors") ? " / " + fmt(g<number>("totalFloors")) : ""}` : ""],
    [t.year, fmt(g<number>("yearBuilt"))],
    [t.deed, labelOf(deedTypeOptions, g<string>("deedType"))],
    [t.code, g<string>("code") ?? ""],
  ] as [string, string][]).filter(([, v]) => v);

  return (
    <main className="wrap">
      <div className="crumb">
        <Link href={`/${locale}`}>{t.home}</Link><span className="sep">›</span>
        <Link href={`/${locale}/search`}>{TXB[tx]?.[locale]}</Link><span className="sep">›</span>
        <span>{loc}</span>
      </div>

      <div className="titlerow">
        <div>
          <span className="tag">{TXB[tx]?.[locale]}{doc.code ? ` · ${doc.code}` : ""}</span>
          <h1>{g<string>("title")}</h1>
          <div className="loc">{loc}</div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="gallery">
          {images.slice(0, 3).map((src, i) => (
            <div key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={g<string>("title") ?? ""} />
            </div>
          ))}
        </div>
      ) : null}

      <div className="facts">
        {area ? <div className="fact"><b>{fmt(area)}</b><span>{t.area}</span></div> : null}
        {g<number>("bedrooms") ? <div className="fact"><b>{fmt(g<number>("bedrooms"))}</b><span>{t.beds}</span></div> : null}
        {g<number>("bathrooms") ? <div className="fact"><b>{fmt(g<number>("bathrooms"))}</b><span>{t.baths}</span></div> : null}
        {g<number>("floor") ? <div className="fact"><b>{fmt(g<number>("floor"))}</b><span>{t.floor}</span></div> : null}
        {g<number>("yearBuilt") ? <div className="fact"><b>{fmt(g<number>("yearBuilt"))}</b><span>{t.year}</span></div> : null}
      </div>

      <div className="detail">
        <div>
          {amenities.length > 0 ? (
            <div className="block">
              <h2>{t.amen}</h2>
              <div className="amen">
                {amenities.map((a) => (
                  <div key={a}><span className="tick">✓</span>{a}</div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="block">
            <h2>{t.specs}</h2>
            <div className="specs">
              {specs.map(([k, v]) => (
                <div key={k}><span>{k}</span><b>{v}</b></div>
              ))}
            </div>
          </div>

          <div className="block">
            <h2>{t.map}</h2>
            <div className="map"><small>{t.mapNote}</small></div>
          </div>
        </div>

        <aside className="aside">
          <div className="box">
            <div className="price-head">
              <div className="big">
                {isRent
                  ? `${fmt(g<number>("deposit"))} ${locale === "fa" ? "ودیعه" : locale === "ar" ? "وديعة" : "deposit"}`
                  : `${fmt(price)} `}
                <span>{isRent ? `/ ${fmt(g<number>("rent"))}` : locale === "fa" ? "تومان" : "Toman"}</span>
              </div>
              {perMeter ? <div className="alt">{t.perMeter}: {fmt(perMeter)}</div> : null}
            </div>
            <a className="btn btn--brass" href={`tel:${PHONE}`} style={{ width: "100%" }}>{t.call}</a>
            <div className="fg2" style={{ marginTop: 10 }}>
              <a className="btn btn--ghost" href="#">{t.wa}</a>
              <a className="btn btn--ghost" href="#">{t.tg}</a>
            </div>
            <Link className="btn btn--ink" href={`/${locale}/submit`} style={{ width: "100%", marginTop: 10, background: "var(--ink)", color: "var(--ivory)" }}>{t.visit}</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

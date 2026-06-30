import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { searchListings } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";

export const dynamic = "force-dynamic";

const TX_TABS = [
  { v: "", fa: "همه", en: "All", ar: "الكل" },
  { v: "sale", fa: "خرید", en: "Buy", ar: "شراء" },
  { v: "rent", fa: "رهن و اجاره", en: "Rent", ar: "إيجار" },
  { v: "shortTerm", fa: "اجاره ماهانه مبله", en: "Monthly furnished", ar: "إيجار شهري مفروش" },
  { v: "fullDeposit", fa: "رهن کامل", en: "Full deposit", ar: "رهن كامل" },
  { v: "swap", fa: "معاوضه", en: "Swap", ar: "مقايضة" },
  { v: "partnership", fa: "مشارکت در ساخت", en: "Partnership", ar: "مشاركة" },
];

// Province / city / district options (alphabetical districts) for the structured filter.
const PROVINCES = ["تهران", "البرز", "اصفهان", "فارس", "خراسان رضوی", "آذربایجان شرقی", "مازندران", "گیلان", "قم", "یزد", "کرمان", "خوزستان"];
const CITIES = ["تهران", "کرج", "اصفهان", "مشهد", "شیراز", "تبریز", "قم", "اهواز", "رشت", "ساری", "یزد", "کرمان"];
const DISTRICTS = ["الهیه", "امانیه", "اندرزگو", "پاسداران", "پونک", "جردن", "دارآباد", "درکه", "دروس", "دزاشیب", "زعفرانیه", "سعادت‌آباد", "سوهانک", "شهرک غرب", "ظفر", "فرمانیه", "فرشته", "قیطریه", "کامرانیه", "گاندی", "محمودیه", "میرداماد", "نیاوران", "ولنجک", "ونک"];

type SXItem = { title: string; count: (n: number) => string; none: string; search: string; q: string; province: string; city: string; district: string; codePh: string; any: string };
const SX: Record<Locale, SXItem> = {
  fa: { title: "جستجوی املاک در سراسر ایران", count: (n) => `${n.toLocaleString("fa-IR")} ملک`, none: "ملکی با این فیلترها یافت نشد. به‌زودی املاک بیشتری از طریق پنل مدیریت افزوده می‌شود.", search: "جستجو", q: "عنوان یا محله…", province: "استان", city: "شهر", district: "منطقه", codePh: "کد ملک…", any: "همه" },
  en: { title: "Search properties across Iran", count: (n) => `${n} properties`, none: "No properties match these filters yet. Listings are added via the admin panel.", search: "Search", q: "City, neighborhood or title…", province: "Province", city: "City", district: "District", codePh: "Property code…", any: "All" },
  ar: { title: "البحث عن العقارات في جميع أنحاء إيران", count: (n) => `${n.toLocaleString("ar-EG")} عقار`, none: "لا توجد عقارات مطابقة لهذه المرشحات بعد. تُضاف العقارات عبر لوحة الإدارة.", search: "بحث", q: "المدينة أو الحي أو العنوان…", province: "المحافظة", city: "المدينة", district: "المنطقة", codePh: "رمز العقار…", any: "الكل" },
};

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const str = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const transactionType = str("transactionType");
  const q = str("q");
  const province = str("province");
  const city = str("city");
  const neighborhood = str("neighborhood");
  const code = str("code");

  const t = await getDictionary(locale);
  const sx = SX[locale];
  const tabs = locale === "fa" ? TX_TABS : TX_TABS.filter((tab) => ["", "rent", "shortTerm", "fullDeposit"].includes(tab.v));
  const results = await searchListings(
    { transactionType: transactionType || undefined, q: q || undefined, province: province || undefined, city: city || undefined, neighborhood: neighborhood || undefined, code: code || undefined },
    locale,
  );

  const tabHref = (v: string) => `/${locale}/search${v ? `?transactionType=${v}` : ""}`;

  return (
    <section>
      <div className="wrap">
        <div style={{ padding: "26px 0 6px" }}>
          <span className="eyebrow">{t.categories.eyebrow}</span>
          <h1 className="h2" style={{ marginTop: 12 }}>{sx.title}</h1>
        </div>

        <form className="fbar" action={`/${locale}/search`} method="get">
          <div className="fbar__tabs">
            {tabs.map((tab) => (
              <Link key={tab.v} href={tabHref(tab.v)} className={transactionType === tab.v ? "on" : ""}>
                {tab[locale]}
              </Link>
            ))}
          </div>
          {transactionType ? <input type="hidden" name="transactionType" value={transactionType} /> : null}
          <div className="fbar__row">
            {locale === "fa" ? (
              <>
                <select name="province" defaultValue={province} aria-label={sx.province}>
                  <option value="">{sx.province}: {sx.any}</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select name="city" defaultValue={city} aria-label={sx.city}>
                  <option value="">{sx.city}: {sx.any}</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select name="neighborhood" defaultValue={neighborhood} aria-label={sx.district}>
                  <option value="">{sx.district}: {sx.any}</option>
                  {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </>
            ) : (
              <input type="text" name="q" defaultValue={q} placeholder={sx.q} aria-label={sx.search} />
            )}
            <input type="text" name="code" defaultValue={code} placeholder={sx.codePh} aria-label={sx.codePh} className="fbar__code" />
            <button className="btn btn--brass" type="submit">{sx.search}</button>
          </div>
        </form>

        <div className="results-head">
          <strong>{sx.count(results.length)}</strong>
        </div>

        {results.length > 0 ? (
          <div className="grid3" style={{ paddingBottom: 90 }}>
            {results.map((item) => (
              <ListingCard key={item.id} item={item} locale={locale} detailsLabel={t.featured.details} />
            ))}
          </div>
        ) : (
          <div className="empty" style={{ marginBottom: 90 }}>{sx.none}</div>
        )}
      </div>
    </section>
  );
}

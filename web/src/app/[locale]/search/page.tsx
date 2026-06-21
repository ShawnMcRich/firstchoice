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
  { v: "shortTerm", fa: "اجارهٔ کوتاه‌مدت", en: "Short-term", ar: "إيجار قصير" },
  { v: "fullDeposit", fa: "رهن کامل", en: "Full deposit", ar: "رهن كامل" },
  { v: "swap", fa: "معاوضه", en: "Swap", ar: "مقايضة" },
  { v: "partnership", fa: "مشارکت در ساخت", en: "Partnership", ar: "مشاركة" },
];

const SX: Record<Locale, { title: string; count: (n: number) => string; none: string; ph: string; search: string }> = {
  fa: {
    title: "جستجوی املاک در سراسر ایران",
    count: (n) => `${n.toLocaleString("fa-IR")} ملک`,
    none: "ملکی با این فیلترها یافت نشد. به‌زودی املاک بیشتری از طریق پنل مدیریت افزوده می‌شود.",
    ph: "شهر، محله یا عنوان…",
    search: "جستجو",
  },
  en: {
    title: "Search properties across Iran",
    count: (n) => `${n} properties`,
    none: "No properties match these filters yet. Listings are added via the admin panel.",
    ph: "City, neighborhood or title…",
    search: "Search",
  },
  ar: {
    title: "البحث عن العقارات في جميع أنحاء إيران",
    count: (n) => `${n.toLocaleString("ar-EG")} عقار`,
    none: "لا توجد عقارات مطابقة لهذه المرشحات بعد. تُضاف العقارات عبر لوحة الإدارة.",
    ph: "المدينة أو الحي أو العنوان…",
    search: "بحث",
  },
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
  const transactionType = typeof sp.transactionType === "string" ? sp.transactionType : "";
  const q = typeof sp.q === "string" ? sp.q : "";

  const t = await getDictionary(locale);
  const sx = SX[locale];
  const results = await searchListings({ transactionType: transactionType || undefined, q: q || undefined }, locale);

  const tabHref = (v: string) => {
    const usp = new URLSearchParams();
    if (v) usp.set("transactionType", v);
    if (q) usp.set("q", q);
    const qs = usp.toString();
    return `/${locale}/search${qs ? `?${qs}` : ""}`;
  };

  return (
    <section>
      <div className="wrap">
        <div style={{ padding: "26px 0 6px" }}>
          <span className="eyebrow">{t.categories.eyebrow}</span>
          <h1 className="h2" style={{ marginTop: 12 }}>{sx.title}</h1>
        </div>

        <div className="fbar">
          <div className="fbar__tabs">
            {TX_TABS.map((tab) => (
              <Link key={tab.v} href={tabHref(tab.v)} className={transactionType === tab.v ? "on" : ""}>
                {tab[locale]}
              </Link>
            ))}
          </div>
          <form action={`/${locale}/search`} method="get">
            {transactionType ? <input type="hidden" name="transactionType" value={transactionType} /> : null}
            <input type="text" name="q" defaultValue={q} placeholder={sx.ph} aria-label={sx.search} />
            <button className="btn btn--brass" type="submit">{sx.search}</button>
          </form>
        </div>

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

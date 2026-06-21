import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { RentDepositConverter } from "@/components/RentDepositConverter";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { getRates } from "@/lib/rates";

const T: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    sub: string;
    deposit: string;
    rent: string;
    rate: string;
    summary: string;
    ccTitle: string;
    ccSub: string;
    amount: string;
    toman: string;
    usd: string;
    eur: string;
    inToman: string;
    inUsd: string;
    inEur: string;
    rateLabel: (usd: string, eur: string, date: string) => string;
  }
> = {
  fa: {
    eyebrow: "ابزارها",
    title: "تبدیل رهن و اجاره",
    sub: "ودیعه و اجاره را بر اساس نرخ رایج بازار به هم تبدیل کنید.",
    deposit: "ودیعه (رهن) — تومان",
    rent: "اجارهٔ ماهانه — تومان",
    rate: "نرخ مرجع: هر ۱٬۰۰۰٬۰۰۰ تومان ودیعه ≈ ۳۰٬۰۰۰ تومان اجاره (۳٪ ماهانه)",
    summary: "ودیعه {deposit} ↔ اجاره {rent} تومان",
    ccTitle: "تبدیل ارز — تومان، دلار و یورو",
    ccSub: "برای مشتریان خارجی: ارزش ملک را به نرخ روز بازار آزاد به دلار و یورو ببینید.",
    amount: "مبلغ",
    toman: "تومان",
    usd: "دلار (USD)",
    eur: "یورو (EUR)",
    inToman: "تومان",
    inUsd: "دلار آمریکا",
    inEur: "یورو",
    rateLabel: (usd, eur, date) =>
      `نرخ بازار آزاد: هر دلار ${usd} تومان · هر یورو ${eur} تومان${date ? ` · به‌روزرسانی ${date}` : ""}`,
  },
  en: {
    eyebrow: "Tools",
    title: "Deposit ↔ Rent converter",
    sub: "Convert between deposit (رهن) and monthly rent at the common market rate.",
    deposit: "Deposit — Toman",
    rent: "Monthly rent — Toman",
    rate: "Reference rate: every 1,000,000 Toman of deposit ≈ 30,000 Toman of rent (3% / month).",
    summary: "Deposit {deposit} ↔ Rent {rent} Toman",
    ccTitle: "Currency converter — Toman, USD & EUR",
    ccSub: "For international clients: see a property's value in US Dollars and Euros at the live free-market rate.",
    amount: "Amount",
    toman: "Toman",
    usd: "US Dollar (USD)",
    eur: "Euro (EUR)",
    inToman: "Toman",
    inUsd: "US Dollars",
    inEur: "Euros",
    rateLabel: (usd, eur, date) =>
      `Free-market rate: 1 USD = ${usd} Toman · 1 EUR = ${eur} Toman${date ? ` · updated ${date}` : ""}`,
  },
  ar: {
    eyebrow: "أدوات",
    title: "محوّل الوديعة والإيجار",
    sub: "حوّل بين الوديعة (الرهن) والإيجار الشهري وفق السعر السائد في السوق.",
    deposit: "الوديعة — تومان",
    rent: "الإيجار الشهري — تومان",
    rate: "السعر المرجعي: كل ١٬٠٠٠٬٠٠٠ تومان وديعة ≈ ٣٠٬٠٠٠ تومان إيجار (٣٪ شهريًا).",
    summary: "وديعة {deposit} ↔ إيجار {rent} تومان",
    ccTitle: "محوّل العملات — تومان ودولار ويورو",
    ccSub: "للعملاء الأجانب: اطّلع على قيمة العقار بالدولار واليورو حسب سعر السوق الحرة.",
    amount: "المبلغ",
    toman: "تومان",
    usd: "دولار (USD)",
    eur: "يورو (EUR)",
    inToman: "تومان",
    inUsd: "دولار أمريكي",
    inEur: "يورو",
    rateLabel: (usd, eur, date) =>
      `سعر السوق الحرة: دولار = ${usd} تومان · يورو = ${eur} تومان${date ? ` · تحديث ${date}` : ""}`,
  },
};

export const revalidate = 3600;

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = T[locale];
  const rates = await getRates();
  const intl = locale === "en" ? "en-US" : locale === "ar" ? "ar-EG" : "fa-IR";
  const f = (n: number) => n.toLocaleString(intl);
  const date = locale === "fa" ? rates.asOfJalali : rates.asOf;
  const rateLabel = t.rateLabel(f(rates.usd), f(rates.eur), date);

  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">{t.eyebrow}</span>

        <h1 className="h2" style={{ margin: "12px 0 14px" }}>{t.ccTitle}</h1>
        <p className="lead" style={{ marginBottom: 28 }}>{t.ccSub}</p>
        <CurrencyConverter
          locale={locale}
          rates={{ usd: rates.usd, eur: rates.eur }}
          labels={{
            amount: t.amount,
            toman: t.toman,
            usd: t.usd,
            eur: t.eur,
            inToman: t.inToman,
            inUsd: t.inUsd,
            inEur: t.inEur,
            rate: rateLabel,
          }}
        />

        <h2 className="h2" style={{ margin: "56px 0 14px" }}>{t.title}</h2>
        <p className="lead" style={{ marginBottom: 28 }}>{t.sub}</p>
        <RentDepositConverter locale={locale} depositLabel={t.deposit} rentLabel={t.rent} rateNote={t.rate} summary={t.summary} />
      </div>
    </section>
  );
}

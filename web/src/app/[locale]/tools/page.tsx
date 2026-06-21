import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { RentDepositConverter } from "@/components/RentDepositConverter";

const T: Record<Locale, { eyebrow: string; title: string; sub: string; deposit: string; rent: string; rate: string; summary: string }> = {
  fa: {
    eyebrow: "ابزارها",
    title: "تبدیل رهن و اجاره",
    sub: "ودیعه و اجاره را بر اساس نرخ رایج بازار به هم تبدیل کنید.",
    deposit: "ودیعه (رهن) — تومان",
    rent: "اجارهٔ ماهانه — تومان",
    rate: "نرخ مرجع: هر ۱٬۰۰۰٬۰۰۰ تومان ودیعه ≈ ۳۰٬۰۰۰ تومان اجاره (۳٪ ماهانه)",
    summary: "ودیعه {deposit} ↔ اجاره {rent} تومان",
  },
  en: {
    eyebrow: "Tools",
    title: "Deposit ↔ Rent converter",
    sub: "Convert between deposit (رهن) and monthly rent at the common market rate.",
    deposit: "Deposit — Toman",
    rent: "Monthly rent — Toman",
    rate: "Reference rate: every 1,000,000 Toman of deposit ≈ 30,000 Toman of rent (3% / month).",
    summary: "Deposit {deposit} ↔ Rent {rent} Toman",
  },
  ar: {
    eyebrow: "أدوات",
    title: "محوّل الوديعة والإيجار",
    sub: "حوّل بين الوديعة (الرهن) والإيجار الشهري وفق السعر السائد في السوق.",
    deposit: "الوديعة — تومان",
    rent: "الإيجار الشهري — تومان",
    rate: "السعر المرجعي: كل ١٬٠٠٠٬٠٠٠ تومان وديعة ≈ ٣٠٬٠٠٠ تومان إيجار (٣٪ شهريًا).",
    summary: "وديعة {deposit} ↔ إيجار {rent} تومان",
  },
};

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = T[locale];

  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="h2" style={{ margin: "12px 0 14px" }}>{t.title}</h1>
        <p className="lead" style={{ marginBottom: 28 }}>{t.sub}</p>
        <RentDepositConverter locale={locale} depositLabel={t.deposit} rentLabel={t.rent} rateNote={t.rate} summary={t.summary} />
      </div>
    </section>
  );
}

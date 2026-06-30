import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

type Item = { h: string; p: string };
type NC = { eyebrow: string; title: string; intro: string; items: Item[]; soon: string };
const D: Record<Locale, NC> = {
  fa: {
    eyebrow: "اخبار ملکی",
    title: "اخبار و تحلیل بازار ملک",
    intro: "جدیدترین اخبار، نرخ‌ها و تحلیل‌های بازار مسکن تهران را اینجا دنبال کنید.",
    items: [
      { h: "روند قیمت مسکن در شمال تهران", p: "مروری بر تغییرات نرخ خرید و اجاره در محله‌هایی چون جردن، الهیه و زعفرانیه." },
      { h: "راهنمای اجارهٔ ماهانهٔ مبله", p: "نکات کلیدی برای اجارهٔ ماهانه و مبله، به‌ویژه برای اتباع خارجی و مأموریت‌ها." },
      { h: "نکات حقوقی قرارداد و کد رهگیری", p: "آنچه پیش از امضای قرارداد و دریافت کد رهگیری باید بدانید." },
    ],
    soon: "به‌زودی مطالب بیشتری منتشر می‌شود.",
  },
  en: {
    eyebrow: "Property news",
    title: "Market news & analysis",
    intro: "Follow the latest news, rates and analysis of the Tehran property market here.",
    items: [
      { h: "North-Tehran price trends", p: "An overview of buy and rent rate changes in areas like Jordan, Elahieh and Zaferanieh." },
      { h: "Guide to monthly furnished rentals", p: "Key points for monthly furnished leases, especially for foreign nationals and missions." },
      { h: "Contracts & the tracking code", p: "What to know before signing a contract and obtaining the registration code (کد رهگیری)." },
    ],
    soon: "More articles coming soon.",
  },
  ar: {
    eyebrow: "أخبار عقارية",
    title: "أخبار وتحليل سوق العقار",
    intro: "تابع هنا أحدث الأخبار والأسعار وتحليلات سوق العقار في طهران.",
    items: [
      { h: "اتجاهات الأسعار في شمال طهران", p: "نظرة على تغيّرات أسعار البيع والإيجار في أحياء مثل جردن والهیه وزعفرانیه." },
      { h: "دليل الإيجار الشهري المفروش", p: "نقاط أساسية للإيجار الشهري المفروش، خاصةً للأجانب والبعثات." },
      { h: "العقود ورمز التتبّع", p: "ما يجب معرفته قبل توقيع العقد والحصول على رمز التسجيل (کد رهگیری)." },
    ],
    soon: "المزيد من المقالات قريبًا.",
  },
};

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = D[locale];
  return (
    <>
      <section className="subintro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="subintro__bg" src="/img/tehran-tower-night.webp" alt="" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{d.eyebrow}</span>
          <h1>{d.title}</h1>
          <p>{d.intro}</p>
        </div>
      </section>
      <div className="wrap">
        <div className="ppage">
          <div className="pcards">
            {d.items.map((c) => (<div className="pcard" key={c.h}><h3>{c.h}</h3><p>{c.p}</p></div>))}
          </div>
          <p style={{ color: "var(--muted)" }}>{d.soon}</p>
        </div>
      </div>
    </>
  );
}

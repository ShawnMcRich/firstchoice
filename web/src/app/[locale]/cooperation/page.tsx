import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

type Card = { h: string; p: string };
type CC = { eyebrow: string; title: string; intro: string; cards: Card[]; ctaText: string; cta: string };
const D: Record<Locale, CC> = {
  fa: {
    eyebrow: "همکاری",
    title: "همکاری با انتخاب اول",
    intro: "ما به همکاری بلندمدت و قانون‌مدار با مالکان، سازندگان و مشاوران املاک باور داریم. اگر ملکی برای عرضه دارید یا به‌دنبال مشارکت هستید، در کنار شماییم.",
    cards: [
      { h: "مالکان و موجران", p: "ملک خود را برای فروش، رهن و اجاره یا اجارهٔ ماهانه به ما بسپارید؛ کارشناسی، عکاسی و قرارداد رسمی با ما." },
      { h: "مشارکت در ساخت", p: "برای پروژه‌های مشارکت در ساخت و سرمایه‌گذاری ساختمانی با تیم ما همکاری کنید." },
      { h: "معاوضه", p: "ملک خود را با ملک دیگری معاوضه کنید؛ گزینه‌های مناسب معاوضه را برایتان پیدا می‌کنیم." },
    ],
    ctaText: "برای شروع همکاری با ما در تماس باشید.",
    cta: "تماس با ما",
  },
  en: {
    eyebrow: "Cooperation",
    title: "Partner with First Choice",
    intro: "We believe in long-term, lawful cooperation with owners, builders and agents. Whether you have a property to offer or are looking for a build partnership, we’re with you.",
    cards: [
      { h: "Owners & landlords", p: "List your property for sale, rent or monthly lease — valuation, photography and a registered contract, all handled by us." },
      { h: "Build partnership", p: "Work with our team on build-partnership and construction-investment projects." },
      { h: "Swaps", p: "Swap your property for another — we’ll find the right exchange for you." },
    ],
    ctaText: "Get in touch to start working together.",
    cta: "Contact us",
  },
  ar: {
    eyebrow: "تعاون",
    title: "تعاون مع الخيار الأول",
    intro: "نؤمن بالتعاون طويل الأمد والقانوني مع المالكين والبنّائين والوسطاء. سواء كان لديك عقار لعرضه أو تبحث عن مشاركة في البناء، نحن معك.",
    cards: [
      { h: "المالكون والمؤجرون", p: "أودِع عقارك للبيع أو الإيجار أو الإيجار الشهري؛ التقييم والتصوير والعقد الرسمي علينا." },
      { h: "المشاركة في البناء", p: "تعاون مع فريقنا في مشاريع المشاركة في البناء والاستثمار العقاري." },
      { h: "المقايضة", p: "بادل عقارك بعقار آخر — نجد لك الخيار المناسب للمقايضة." },
    ],
    ctaText: "تواصل معنا لبدء التعاون.",
    cta: "اتصل بنا",
  },
};

export default async function CooperationPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {d.cards.map((c) => (<div className="pcard" key={c.h}><h3>{c.h}</h3><p>{c.p}</p></div>))}
          </div>
          <p>{d.ctaText}</p>
          <Link className="btn btn--brass" href={`/${locale}/contact`}>{d.cta}</Link>
        </div>
      </div>
    </>
  );
}

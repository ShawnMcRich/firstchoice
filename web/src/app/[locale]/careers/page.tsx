import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

type Card = { h: string; p: string };
type CC = { eyebrow: string; title: string; intro: string; cards: Card[]; ctaText: string; cta: string };
const D: Record<Locale, CC> = {
  fa: {
    eyebrow: "استخدام",
    title: "به تیم انتخاب اول بپیوندید",
    intro: "ما همواره به‌دنبال همکاران حرفه‌ای، باانگیزه و قانون‌مدار در حوزهٔ املاک هستیم. اگر به دنیای املاک علاقه دارید، منتظر شما هستیم.",
    cards: [
      { h: "مشاور املاک", p: "ارتباط با مشتریان، بازدید و مذاکره برای خرید، فروش و اجاره." },
      { h: "کارشناس بازدید و عکاسی", p: "ثبت، عکاسی و معرفی حرفه‌ای املاک." },
      { h: "پشتیبانی و اداری", p: "هماهنگی، تنظیم قرارداد و امور دفتری." },
    ],
    ctaText: "رزومهٔ خود را از طریق صفحهٔ تماس برای ما ارسال کنید.",
    cta: "ارسال رزومه",
  },
  en: {
    eyebrow: "Careers",
    title: "Join the First Choice team",
    intro: "We’re always looking for professional, motivated and principled people in real estate. If you’re passionate about property, we’d love to hear from you.",
    cards: [
      { h: "Property advisor", p: "Work with clients on viewings and negotiation for buying, selling and renting." },
      { h: "Viewing & photography specialist", p: "Capture, photograph and present properties professionally." },
      { h: "Support & office", p: "Coordination, contracts and office operations." },
    ],
    ctaText: "Send us your CV through the contact page.",
    cta: "Send your CV",
  },
  ar: {
    eyebrow: "التوظيف",
    title: "انضم إلى فريق الخيار الأول",
    intro: "نبحث دائمًا عن أشخاص محترفين ومتحمّسين وملتزمين في مجال العقارات. إن كنت شغوفًا بالعقارات، يسعدنا تواصلك معنا.",
    cards: [
      { h: "مستشار عقاري", p: "التعامل مع العملاء والمعاينة والتفاوض للبيع والشراء والإيجار." },
      { h: "أخصائي معاينة وتصوير", p: "توثيق وتصوير وعرض العقارات باحتراف." },
      { h: "الدعم والمكتب", p: "التنسيق والعقود وأعمال المكتب." },
    ],
    ctaText: "أرسل سيرتك الذاتية عبر صفحة الاتصال.",
    cta: "أرسل سيرتك الذاتية",
  },
};

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
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

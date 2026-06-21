import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

const PHONE = "+982122041212";

type AboutContent = {
  eyebrow: string; name: string; role: string; bio: string;
  contactBtn: string; viewBtn: string;
  storyEyebrow: string; storyTitle: string; story: string[];
  sign1: string; sign2: string; quote: string;
  stats: { n: string; l: string }[]; ctaTitle: string; ctaText: string; phone: string;
};

const C: Record<Locale, AboutContent> = {
  fa: {
    eyebrow: "دربارهٔ ما · از سال ۱۳۶۷",
    name: "داریوش غنی‌زاده",
    role: "مدیریت · مشاورین املاک انتخاب اول",
    bio: "داریوش غنی‌زاده، بنیان‌گذار و مدیر مشاورین املاک انتخاب اول، از سال ۱۳۶۷ در بازار املاک فعال است. با پروانهٔ رسمی مشاور املاک و نزدیک به چهار دهه تجربه، در کنار خانواده‌های ایرانی و نیز سفارت‌خانه‌ها و شرکت‌های خارجی، بر پایهٔ صداقت، شناخت دقیق بازار و رابطهٔ بلندمدت با مشتریان خدمت کرده است.",
    contactBtn: "تماس و مشاوره",
    viewBtn: "مشاهدهٔ املاک",
    storyEyebrow: "سخن مدیریت",
    storyTitle: "تعهد ما به شما",
    story: [
      "ما معتقدیم باید آن‌گونه که مورد نظر متقاضیانمان است در خدمتشان باشیم. حدود موفقیت ما به‌میزان رضایت متقاضیان ما بوده است؛ که انسجام و استمرار کاری و حفظ ارتباط ارباب‌رجوع با ما از سال ۱۳۶۷ تاکنون، خود گواه این مطلب می‌باشد. ما به‌عنوان گروه مشاورین املاک دارای پروانهٔ رسمی، در خدمت شهرمان تهران هستیم و افتخار داریم که با همشهریان خود در جهت رفع نیازهای ملکی آنان بکوشیم.",
      "ما معتقدیم که یک مشاور املاک باید تمام ابعاد جامعهٔ خویش را خوب بشناسد؛ املاک داخل طرح شهرداری، اتوبان‌ها، مراکز خرید، مدارس، مراکز درمانی و تفریحی. زمانی که در جستجوی خرید یا اجارهٔ ملکی باشید، ما با ارائهٔ آخرین اخبار روزِ بازار، آمادهٔ پاسخ‌گویی به تمام سؤالات شما هستیم.",
      "به‌عنوان مشاور شما، قدم را فراتر می‌گذاریم و کمک‌تان می‌کنیم ملک دلخواه خود را به قیمتی منصفانه خریداری یا اجاره نمایید. به پشتوانهٔ اطمینان و احترامی که مردم خوب ما برای سابقهٔ این دفتر قائل‌اند، ما قادریم رؤیای شما را به واقعیت مبدل سازیم.",
    ],
    sign1: "مدیریت مشاورین املاک انتخاب اول",
    sign2: "غنی‌زاده",
    quote: "تأمین منافع شما به‌نحو مطلوب، در درجهٔ اول اهمیتِ مشاورین املاک انتخاب اول است.",
    stats: [
      { n: "۳۸+", l: "سال سابقه (از ۱۳۶۷)" },
      { n: "پروانهٔ رسمی", l: "مشاور املاک" },
      { n: "سفارت‌خانه‌ها", l: "و شرکت‌های خارجی" },
    ],
    ctaTitle: "برای مشاوره یا بازدید، در تماس باشید",
    ctaText: "پاسخ‌گویی سریع · فارسی، انگلیسی و عربی",
    phone: "۰۲۱-۲۲۰۴-۱۲۱۲",
  },
  en: {
    eyebrow: "About us · since 1988",
    name: "Dariush Ghanizadeh",
    role: "Founder & Manager · First Choice Real Estate",
    bio: "Dariush Ghanizadeh, founder and manager of First Choice Real Estate, has worked in the property market since 1988. A licensed real-estate advisor with nearly four decades of experience, he has served Iranian families as well as embassies and international companies — on a foundation of honesty, deep market knowledge, and long-term relationships.",
    contactBtn: "Call & consult",
    viewBtn: "Browse properties",
    storyEyebrow: "From the management",
    storyTitle: "Our commitment to you",
    story: [
      "We believe in serving our clients exactly as they wish to be served. The measure of our success is our clients' satisfaction — and the continuity and lasting relationships we've kept since 1988 are proof of that. As a licensed group of real-estate advisors, we are proud to serve our city, Tehran, and to help our neighbors meet their property needs.",
      "We believe an advisor must know every dimension of the community: zoning plans, highways, shopping, schools, healthcare and leisure. When you're searching to buy or rent, we're ready to answer every question with the latest from the market.",
      "As your advisor, we go a step further and help you buy or rent the right property at a fair price. Backed by the trust and respect our clients hold for this office's record, we can turn your vision into reality.",
    ],
    sign1: "First Choice Real Estate — Management",
    sign2: "Ghanizadeh",
    quote: "Serving your interests, fully, is the first priority of First Choice Real Estate.",
    stats: [
      { n: "38+", l: "years (since 1988)" },
      { n: "Licensed", l: "real-estate advisor" },
      { n: "Embassies", l: "& international firms" },
    ],
    ctaTitle: "Get in touch for advice or a viewing",
    ctaText: "Fast response · Persian, English & Arabic",
    phone: "+98 21 2204 1212",
  },
  ar: {
    eyebrow: "من نحن · منذ ١٩٨٨",
    name: "داریوش غنی‌زاده",
    role: "المؤسس والمدير · العقارية الخيار الأول",
    bio: "داریوش غنی‌زاده، مؤسس ومدير العقارية الخيار الأول، يعمل في سوق العقارات منذ ١٩٨٨. مستشار عقاري مرخّص بخبرة تقارب أربعة عقود، خدم العائلات الإيرانية وكذلك السفارات والشركات الأجنبية — على أساس من الصدق والمعرفة الدقيقة بالسوق والعلاقات طويلة الأمد.",
    contactBtn: "اتصل واستشر",
    viewBtn: "تصفّح العقارات",
    storyEyebrow: "من الإدارة",
    storyTitle: "التزامنا تجاهكم",
    story: [
      "نؤمن بخدمة عملائنا تمامًا كما يرغبون. مقياس نجاحنا هو رضا عملائنا — واستمرارية علاقاتنا منذ ١٩٨٨ خير دليل على ذلك. كمجموعة من المستشارين العقاريين المرخّصين، نفخر بخدمة مدينتنا طهران ومساعدة أهلها في تلبية احتياجاتهم العقارية.",
      "نؤمن بأن المستشار يجب أن يعرف كل أبعاد مجتمعه: المخططات البلدية والطرق والمراكز التجارية والمدارس والمراكز الصحية والترفيهية. وعندما تبحثون عن شراء أو إيجار، نحن جاهزون للإجابة عن كل أسئلتكم بأحدث معطيات السوق.",
      "كمستشارٍ لكم، نخطو خطوة إضافية لمساعدتكم على الشراء أو الإيجار بسعر عادل. وبفضل الثقة والاحترام الذي يكنّه عملاؤنا لسجل هذا المكتب، نستطيع تحويل حلمكم إلى حقيقة.",
    ],
    sign1: "إدارة العقارية الخيار الأول",
    sign2: "غنی‌زاده",
    quote: "تأمين مصالحكم على أكمل وجه هو الأولوية الأولى للعقارية الخيار الأول.",
    stats: [
      { n: "+٣٨", l: "عامًا (منذ ١٩٨٨)" },
      { n: "مرخّص", l: "مستشار عقاري" },
      { n: "السفارات", l: "والشركات الأجنبية" },
    ],
    ctaTitle: "تواصلوا معنا للاستشارة أو المعاينة",
    ctaText: "استجابة سريعة · بالفارسية والإنجليزية والعربية",
    phone: "٠٢١-٢٢٠٤-١٢١٢",
  },
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = C[locale];

  return (
    <>
      <section>
        <div className="wrap">
          <div className="abhero">
            <div>
              <span className="eyebrow">{c.eyebrow}</span>
              <h1>{c.name}</h1>
              <div className="role">{c.role}</div>
              <p>{c.bio}</p>
              <div className="cta">
                <a className="btn btn--brass" href={`tel:${PHONE}`}>{c.contactBtn}</a>
                <Link className="btn btn--ghost" href={`/${locale}/search`}>{c.viewBtn}</Link>
              </div>
            </div>
            <div className="portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dariush.webp" alt={c.name} />
              <span className="ring" />
            </div>
          </div>
        </div>
      </section>

      <section className="story">
        <div className="wrap">
          <div className="grid">
            <div>
              <span className="eyebrow">{c.storyEyebrow}</span>
              <h2 style={{ marginTop: 14 }}>{c.storyTitle}</h2>
            </div>
            <div>
              {c.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="sign">
                {c.sign1}
                <span>{c.sign2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quote">
        <div className="wrap">
          <p>«{c.quote}»</p>
        </div>
      </section>

      <section className="stats">
        <div className="wrap">
          {c.stats.map((s) => (
            <div key={s.l}>
              <b>{s.n}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <a className="btn btn--brass" href={`tel:${PHONE}`}>{c.phone}</a>
          <div className="contact">property@firstchoiceco.com · firstchoiceco.com</div>
        </div>
      </section>
    </>
  );
}

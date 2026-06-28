import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

const HERO_IMG = "/img/tehran-skyline.webp";

async function createLead(formData: FormData) {
  "use server";
  const locale = String(formData.get("locale") || "en");
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: {
        name: String(formData.get("name") || "").slice(0, 200) || "Diplomatic enquiry",
        phone: String(formData.get("phone") || "").slice(0, 60) || "—",
        message: `[Diplomatic] org: ${formData.get("org") || ""} · email: ${formData.get("email") || ""}\n${formData.get("requirements") || ""}`.slice(0, 2000),
      },
    });
  } catch {
    // swallow — concept stage; surfaced as generic success
  }
  redirect(`/${locale}/diplomatic?sent=1`);
}

type DC = {
  eyebrow: string; title: string; titleEm: string; sub: string; cta: string; how: string;
  trust: { b: string; s: string }[];
  svcEyebrow: string; svcTitle: string; svcSub: string; services: { h: string; p: string }[];
  procEyebrow: string; procTitle: string; steps: { n: string; h: string; p: string }[];
  enqEyebrow: string; enqTitle: string; enqText: string;
  f: { name: string; org: string; email: string; phone: string; req: string; send: string; note: string };
  sent: string;
};

const D: Record<Locale, DC> = {
  en: {
    eyebrow: "Diplomatic & Corporate Relocation",
    title: "A home in Tehran,", titleEm: "handled end to end.",
    sub: "First Choice places diplomats, consular staff and international executives in Tehran's finest neighborhoods — professionally, and end to end.",
    cta: "Make an enquiry", how: "What we handle",
    trust: [{ b: "38+ years", s: "serving missions" }, { b: "Embassy belt", s: "north-Tehran specialists" }, { b: "EN / FA / AR", s: "multilingual team" }, { b: "USD / EUR", s: "hard-currency budgeting" }],
    svcEyebrow: "What we handle", svcTitle: "Relocation, end to end.", svcSub: "Vetted homes, fair terms, and the local knowledge to make a posting in Tehran effortless.",
    services: [
      { h: "Furnished & serviced homes", p: "Move-in-ready residences with the standard and security a posting requires." },
      { h: "Short & medium-term leases", p: "Lease lengths matched to your posting, renewals handled ahead of time." },
      { h: "English contracts & negotiation", p: "Clear bilingual contracts, fair terms, properly registered (کد رهگیری)." },
      { h: "Curated, vetted homes", p: "A hand-picked selection matched to your brief and standard." },
      { h: "Embassy-belt expertise", p: "Homes near missions, international schools and foreign-friendly healthcare." },
      { h: "Settling-in support", p: "Utilities, internet and area orientation — sorted before you arrive." },
    ],
    procEyebrow: "The process", procTitle: "Five steps, fully managed.",
    steps: [
      { n: "01", h: "Brief", p: "We map requirements, budget and timeline." },
      { n: "02", h: "Shortlist", p: "A curated selection matched to your brief." },
      { n: "03", h: "Viewings", p: "Accompanied tours, in person or by video." },
      { n: "04", h: "Contract", p: "Negotiation and a clear, registered lease." },
      { n: "05", h: "Settle in", p: "Utilities and orientation before move-in day." },
    ],
    enqEyebrow: "Enquiry", enqTitle: "Tell us what you need.",
    enqText: "Share a few details and our international team will respond personally. We work with missions and companies of every size.",
    f: { name: "Full name", org: "Organization / mission", email: "Email", phone: "Phone", req: "Requirements (area, beds, budget, lease length…)", send: "Send enquiry", note: "We usually reply within one business day, by email or phone." },
    sent: "Thank you — your enquiry has been received. Our team will be in touch shortly.",
  },
  fa: {
    eyebrow: "خدمات بین‌الملل · اسکان دیپلماتیک",
    title: "خانه‌ای در تهران،", titleEm: "از ابتدا تا انتها.",
    sub: "انتخاب اول، دیپلمات‌ها، کارکنان کنسولی و مدیران خارجی را در بهترین محله‌های تهران اسکان می‌دهد — حرفه‌ای و از ابتدا تا انتها.",
    cta: "درخواست مشاوره", how: "خدمات ما",
    trust: [{ b: "۳۸+ سال", s: "در خدمت سفارت‌خانه‌ها" }, { b: "محدودهٔ سفارت‌ها", s: "تخصص شمال تهران" }, { b: "FA / EN / AR", s: "تیم چندزبانه" }, { b: "USD / EUR", s: "بودجه به ارز" }],
    svcEyebrow: "خدمات ما", svcTitle: "اسکان، از ابتدا تا انتها.", svcSub: "املاک بررسی‌شده، شرایط منصفانه و شناخت محلی برای اقامتی بی‌دغدغه در تهران.",
    services: [
      { h: "خانه‌های مبله و سرویس‌دار", p: "املاک آمادهٔ سکونت با استاندارد و امنیت لازم برای یک مأموریت." },
      { h: "اجارهٔ کوتاه و میان‌مدت", p: "مدت اجاره متناسب با دورهٔ مأموریت، با تمدید به‌موقع." },
      { h: "قرارداد انگلیسی و مذاکره", p: "قرارداد دوزبانهٔ شفاف، شرایط منصفانه و دریافت کد رهگیری." },
      { h: "املاک منتخب و بررسی‌شده", p: "مجموعه‌ای گلچین‌شده، متناسب با نیاز و استاندارد شما." },
      { h: "تخصص محدودهٔ سفارت‌ها", p: "نزدیک به سفارت‌خانه‌ها، مدارس بین‌المللی و مراکز درمانی." },
      { h: "پشتیبانی استقرار", p: "آب و برق، اینترنت و آشنایی با محله — پیش از ورود شما." },
    ],
    procEyebrow: "روند کار", procTitle: "پنج گام، کاملاً مدیریت‌شده.",
    steps: [
      { n: "۰۱", h: "نیازسنجی", p: "نیازها، بودجه و زمان‌بندی را مشخص می‌کنیم." },
      { n: "۰۲", h: "گزینه‌ها", p: "فهرستی منتخب و متناسب با نیاز شما." },
      { n: "۰۳", h: "بازدید", p: "بازدید همراه، حضوری یا با ویدئو." },
      { n: "۰۴", h: "قرارداد", p: "مذاکره و قرارداد رسمی و شفاف." },
      { n: "۰۵", h: "استقرار", p: "آب و برق و آشنایی با محله پیش از اسباب‌کشی." },
    ],
    enqEyebrow: "درخواست مشاوره", enqTitle: "نیاز خود را بگویید.",
    enqText: "چند مشخصه را برای ما بفرستید تا تیم بین‌الملل ما شخصاً پاسخ دهد. با مأموریت‌ها و شرکت‌ها در هر اندازه‌ای همکاری می‌کنیم.",
    f: { name: "نام و نام خانوادگی", org: "سازمان / سفارت", email: "ایمیل", phone: "تلفن", req: "نیازها (محله، خواب، بودجه، مدت اجاره…)", send: "ارسال درخواست", note: "معمولاً ظرف یک روز کاری، با ایمیل یا تلفن پاسخ می‌دهیم." },
    sent: "متشکریم — درخواست شما ثبت شد. تیم ما به‌زودی با شما تماس می‌گیرد.",
  },
  ar: {
    eyebrow: "الخدمات الدولية · إسكان دبلوماسي",
    title: "منزل في طهران،", titleEm: "من البداية إلى النهاية.",
    sub: "تتولّى الخيار الأول إسكان الدبلوماسيين وموظفي القنصليات والمدراء الأجانب في أرقى أحياء طهران — باحتراف ومن البداية إلى النهاية.",
    cta: "طلب استشارة", how: "ما نقدّمه",
    trust: [{ b: "+٣٨ عامًا", s: "في خدمة السفارات" }, { b: "نطاق السفارات", s: "خبراء شمال طهران" }, { b: "FA / EN / AR", s: "فريق متعدد اللغات" }, { b: "USD / EUR", s: "ميزانية بالعملة" }],
    svcEyebrow: "ما نقدّمه", svcTitle: "إسكان من البداية إلى النهاية.", svcSub: "عقارات مدقّقة وشروط عادلة ومعرفة محلية تجعل إقامتكم في طهران سلسة.",
    services: [
      { h: "منازل مفروشة ومخدومة", p: "عقارات جاهزة للسكن بالمستوى والأمن الذي يتطلبه التعيين." },
      { h: "إيجارات قصيرة ومتوسطة", p: "مدد إيجار تناسب فترة التعيين مع تجديد مسبق." },
      { h: "عقود إنجليزية وتفاوض", p: "عقود ثنائية اللغة واضحة وشروط عادلة ومسجّلة." },
      { h: "عقارات منتقاة ومدقّقة", p: "مجموعة مختارة بعناية تناسب متطلباتكم ومستواكم." },
      { h: "خبرة نطاق السفارات", p: "قرب السفارات والمدارس الدولية والرعاية الصحية." },
      { h: "دعم الاستقرار", p: "الكهرباء والإنترنت والتعريف بالحي — قبل وصولكم." },
    ],
    procEyebrow: "آلية العمل", procTitle: "خمس خطوات مُدارة بالكامل.",
    steps: [
      { n: "٠١", h: "التعريف", p: "نحدّد المتطلبات والميزانية والجدول الزمني." },
      { n: "٠٢", h: "القائمة", p: "اختيار منسّق يناسب متطلباتكم." },
      { n: "٠٣", h: "المعاينة", p: "جولات مرافقة حضوريًا أو بالفيديو." },
      { n: "٠٤", h: "العقد", p: "تفاوض وعقد رسمي وواضح." },
      { n: "٠٥", h: "الاستقرار", p: "الخدمات والتعريف بالحي قبل الانتقال." },
    ],
    enqEyebrow: "طلب استشارة", enqTitle: "أخبرونا بما تحتاجون.",
    enqText: "شاركونا بعض التفاصيل ليردّ فريقنا الدولي شخصيًا. نعمل مع البعثات والشركات بمختلف أحجامها.",
    f: { name: "الاسم الكامل", org: "الجهة / السفارة", email: "البريد", phone: "الهاتف", req: "المتطلبات (الحي، الغرف، الميزانية، مدة الإيجار…)", send: "إرسال الطلب", note: "نردّ عادةً خلال يوم عمل واحد عبر البريد أو الهاتف." },
    sent: "شكرًا — تم استلام طلبكم. سيتواصل فريقنا معكم قريبًا.",
  },
};

export default async function DiplomaticPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sent = (await searchParams).sent === "1";
  const d = D[locale];

  return (
    <>
      <section className="dhero" style={{ padding: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="dhero__bg" src={HERO_IMG} alt="" />
        <div className="wrap">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1>{d.title} <em>{d.titleEm}</em></h1>
          <p>{d.sub}</p>
          <div className="cta">
            <a className="btn btn--brass" href="#enquiry">{d.cta}</a>
            <a className="btn btn--lite" href="#how">{d.how}</a>
          </div>
        </div>
      </section>

      <div className="tstrip">
        <div className="wrap">
          {d.trust.map((x) => (
            <div key={x.s}>
              <b>{x.b}</b>
              <span>{x.s}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="how">
        <div className="wrap">
          <div className="sh">
            <span className="eyebrow">{d.svcEyebrow}</span>
            <h2>{d.svcTitle}</h2>
            <p>{d.svcSub}</p>
          </div>
          <div className="svc">
            {d.services.map((s) => (
              <div className="it" key={s.h}>
                <div className="ic" />
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proc">
        <div className="wrap">
          <div className="sh">
            <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{d.procEyebrow}</span>
            <h2>{d.procTitle}</h2>
          </div>
          <div className="steps">
            {d.steps.map((s) => (
              <div className="step" key={s.n}>
                <div className="n">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry">
        <div className="wrap">
          <div className="enq">
            <div>
              <span className="eyebrow">{d.enqEyebrow}</span>
              <h2>{d.enqTitle}</h2>
              <p>{d.enqText}</p>
              <div className="contactline">
                <b>tehranfirstchoice@gmail.com</b> · <b>property@firstchoiceco.com</b>
                <br />
                <b>+98 21 2204 1212</b> · +98 912 108 1212
              </div>
            </div>
            <form className="form" action={createLead}>
              {sent ? <div className="okmsg">{d.sent}</div> : null}
              <input type="hidden" name="locale" value={locale} />
              <div className="fg2">
                <div>
                  <label>{d.f.name}</label>
                  <input type="text" name="name" />
                </div>
                <div>
                  <label>{d.f.org}</label>
                  <input type="text" name="org" />
                </div>
              </div>
              <div className="fg2">
                <div>
                  <label>{d.f.email}</label>
                  <input type="email" name="email" />
                </div>
                <div>
                  <label>{d.f.phone}</label>
                  <input type="text" name="phone" />
                </div>
              </div>
              <label>{d.f.req}</label>
              <textarea name="requirements" rows={4} />
              <button className="btn btn--brass" type="submit" style={{ width: "100%", marginTop: 18 }}>{d.f.send}</button>
              <div className="note">{d.f.note}</div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

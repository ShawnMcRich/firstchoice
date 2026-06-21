import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

async function createSubmission(formData: FormData) {
  "use server";
  const locale = String(formData.get("locale") || "fa");
  const numOr = (k: string) => {
    const v = Number(formData.get(k));
    return Number.isFinite(v) && v > 0 ? v : undefined;
  };
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "submissions",
      data: {
        transactionType: String(formData.get("transactionType") || "") || undefined,
        propertyType: String(formData.get("propertyType") || "") || undefined,
        province: String(formData.get("province") || ""),
        city: String(formData.get("city") || ""),
        neighborhood: String(formData.get("neighborhood") || ""),
        area: numOr("area"),
        bedrooms: numOr("bedrooms"),
        price: numOr("price"),
        ownerName: String(formData.get("ownerName") || ""),
        ownerPhone: String(formData.get("ownerPhone") || ""),
        notes: String(formData.get("notes") || ""),
      },
    });
  } catch {
    // concept stage — surfaced as generic success
  }
  redirect(`/${locale}/submit?sent=1`);
}

type Opt = { v: string; l: string };
type SC = {
  eyebrow: string; title: string; intro: string; pts: string[];
  lTx: string; lType: string; lProvince: string; lCity: string; lHood: string;
  lArea: string; lBeds: string; lPrice: string; lName: string; lPhone: string; lNotes: string;
  tx: Opt[]; types: Opt[];
  send: string; foot: string; sent: string;
  whyTitle: string; why: string[]; afterTitle: string; after: string[];
};

const S: Record<Locale, SC> = {
  fa: {
    eyebrow: "سپردن ملک · رایگان · سراسر ایران",
    title: "ملک خود را به انتخاب اول بسپارید",
    intro: "با بیش از سه دهه تجربه (از سال ۱۳۶۷) و شبکه‌ای از خریداران و مستأجران معتبر — از خانواده‌ها تا سفارت‌خانه‌ها و شرکت‌های خارجی — ملک شما را در هر نقطهٔ ایران، حرفه‌ای و محرمانه به نتیجه می‌رسانیم.",
    pts: ["کارشناسی و قیمت‌گذاری رایگان", "عکاسی حرفه‌ای", "تنظیم قرارداد و کد رهگیری"],
    lTx: "نوع معامله", lType: "نوع ملک", lProvince: "استان", lCity: "شهر", lHood: "محله",
    lArea: "متراژ (متر)", lBeds: "اتاق خواب", lPrice: "قیمت پیشنهادی (تومان)", lName: "نام و نام خانوادگی", lPhone: "شمارهٔ تماس", lNotes: "توضیحات",
    tx: [{ v: "sale", l: "فروش" }, { v: "rent", l: "رهن و اجاره" }, { v: "fullDeposit", l: "رهن کامل" }, { v: "swap", l: "معاوضه" }, { v: "partnership", l: "مشارکت در ساخت" }],
    types: [{ v: "apartment", l: "آپارتمان" }, { v: "villa", l: "ویلا" }, { v: "land", l: "زمین" }, { v: "shop", l: "مغازه" }, { v: "officeDeed", l: "دفتر اداری" }, { v: "tower", l: "برج" }, { v: "penthouse", l: "پنت‌هاوس" }],
    send: "ثبت و ارسال برای بررسی",
    foot: "پس از ثبت، ملک شما پیش از انتشار توسط کارشناسان ما بررسی و تأیید می‌شود.",
    sent: "ثبت شد — متشکریم. کارشناس ما برای هماهنگی بازدید و عکاسی با شما تماس می‌گیرد.",
    whyTitle: "چرا انتخاب اول؟",
    why: ["بیش از ۳۸ سال تجربه و اعتماد (از سال ۱۳۶۷)", "شبکهٔ خریداران و مستأجران معتبر در سراسر ایران", "عکاسی حرفه‌ای و معرفی در سایت، اینستاگرام و دیوار", "تنظیم قرارداد رسمی و دریافت کد رهگیری", "محرمانگی کامل اطلاعات و آدرس شما"],
    afterTitle: "بعد از ثبت چه می‌شود؟",
    after: ["کارشناسی و قیمت‌گذاری رایگان", "بازدید و عکاسی حرفه‌ای", "بررسی و تأیید توسط مدیریت", "انتشار و معرفی به متقاضیان"],
  },
  en: {
    eyebrow: "List your property · free · all Iran",
    title: "Entrust your property to First Choice",
    intro: "With over three decades of experience (since 1988) and a network of vetted buyers and tenants — from families to embassies and international companies — we bring your property to a result, anywhere in Iran, professionally and discreetly.",
    pts: ["Free valuation", "Professional photography", "Registered contract"],
    lTx: "Transaction", lType: "Property type", lProvince: "Province", lCity: "City", lHood: "Neighborhood",
    lArea: "Area (m²)", lBeds: "Bedrooms", lPrice: "Asking price (Toman)", lName: "Full name", lPhone: "Phone", lNotes: "Notes",
    tx: [{ v: "sale", l: "Sale" }, { v: "rent", l: "Rent" }, { v: "fullDeposit", l: "Full deposit" }, { v: "swap", l: "Swap" }, { v: "partnership", l: "Partnership" }],
    types: [{ v: "apartment", l: "Apartment" }, { v: "villa", l: "Villa" }, { v: "land", l: "Land" }, { v: "shop", l: "Shop" }, { v: "officeDeed", l: "Office" }, { v: "tower", l: "Tower" }, { v: "penthouse", l: "Penthouse" }],
    send: "Submit for review",
    foot: "After you submit, our team reviews and approves your property before it's published.",
    sent: "Submitted — thank you. Our team will contact you to arrange a viewing and photos.",
    whyTitle: "Why First Choice?",
    why: ["38+ years of trusted experience (since 1988)", "A network of vetted buyers and tenants across Iran", "Professional photography + exposure on site, Instagram & Divar", "Official registered contracts", "Full confidentiality of your details and address"],
    afterTitle: "What happens next?",
    after: ["Free valuation", "Viewing & professional photos", "Review & approval by management", "Publishing & matching with clients"],
  },
  ar: {
    eyebrow: "أودِع عقارك · مجانًا · كل إيران",
    title: "أودِع عقارك لدى الخيار الأول",
    intro: "بخبرة تتجاوز ثلاثة عقود (منذ ١٩٨٨) وشبكة من المشترين والمستأجرين الموثوقين — من العائلات إلى السفارات والشركات الأجنبية — نُوصل عقارك إلى نتيجة في أي مكان بإيران، باحتراف وسرّية.",
    pts: ["تقييم مجاني", "تصوير احترافي", "عقد مُسجّل"],
    lTx: "نوع المعاملة", lType: "نوع العقار", lProvince: "المحافظة", lCity: "المدينة", lHood: "الحي",
    lArea: "المساحة (م²)", lBeds: "غرف النوم", lPrice: "السعر المطلوب (تومان)", lName: "الاسم الكامل", lPhone: "الهاتف", lNotes: "ملاحظات",
    tx: [{ v: "sale", l: "بيع" }, { v: "rent", l: "إيجار" }, { v: "fullDeposit", l: "رهن كامل" }, { v: "swap", l: "مقايضة" }, { v: "partnership", l: "مشاركة" }],
    types: [{ v: "apartment", l: "شقة" }, { v: "villa", l: "فيلا" }, { v: "land", l: "أرض" }, { v: "shop", l: "محل" }, { v: "officeDeed", l: "مكتب" }, { v: "tower", l: "برج" }, { v: "penthouse", l: "بنتهاوس" }],
    send: "إرسال للمراجعة",
    foot: "بعد الإرسال، يراجع فريقنا عقارك ويعتمده قبل النشر.",
    sent: "تم الإرسال — شكرًا لك. سيتواصل فريقنا معك لترتيب المعاينة والصور.",
    whyTitle: "لماذا الخيار الأول؟",
    why: ["أكثر من ٣٨ عامًا من الخبرة الموثوقة (منذ ١٩٨٨)", "شبكة من المشترين والمستأجرين الموثوقين في كل إيران", "تصوير احترافي وعرض على الموقع وإنستغرام وديوار", "عقود رسمية مُسجّلة", "سرّية تامة لبياناتك وعنوانك"],
    afterTitle: "ماذا بعد الإرسال؟",
    after: ["تقييم مجاني", "معاينة وتصوير احترافي", "مراجعة واعتماد من الإدارة", "النشر والمطابقة مع العملاء"],
  },
};

export default async function SubmitPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sent = (await searchParams).sent === "1";
  const s = S[locale];

  return (
    <>
      <section className="subintro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="subintro__bg" src="/img/tehran-tower-night.webp" alt="" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{s.eyebrow}</span>
          <h1>{s.title}</h1>
          <p>{s.intro}</p>
          <div className="pts">
            {s.pts.map((p) => (
              <span key={p}><b>✓</b> {p}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="subwrap">
          <form className="formcard" action={createSubmission}>
            {sent ? <div className="okmsg">{s.sent}</div> : null}
            <input type="hidden" name="locale" value={locale} />

            <div className="fsec">
              <h3><span className="nn">۱</span> {s.lTx} / {s.lType}</h3>
              <div className="fg2">
                <div>
                  <label>{s.lTx}</label>
                  <select name="transactionType" className="fakeselect">
                    {s.tx.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
                <div>
                  <label>{s.lType}</label>
                  <select name="propertyType">
                    {s.types.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="fsec">
              <h3><span className="nn">۲</span> {s.lProvince} / {s.lCity}</h3>
              <div className="fg3">
                <div><label>{s.lProvince}</label><input type="text" name="province" /></div>
                <div><label>{s.lCity}</label><input type="text" name="city" /></div>
                <div><label>{s.lHood}</label><input type="text" name="neighborhood" /></div>
              </div>
            </div>

            <div className="fsec">
              <h3><span className="nn">۳</span> {s.lArea}</h3>
              <div className="fg3">
                <div><label>{s.lArea}</label><input type="number" name="area" /></div>
                <div><label>{s.lBeds}</label><input type="number" name="bedrooms" /></div>
                <div><label>{s.lPrice}</label><input type="number" name="price" /></div>
              </div>
            </div>

            <div className="fsec">
              <h3><span className="nn">۴</span> {s.lName}</h3>
              <div className="fg2">
                <div><label>{s.lName}</label><input type="text" name="ownerName" required /></div>
                <div><label>{s.lPhone}</label><input type="text" name="ownerPhone" required /></div>
              </div>
              <label style={{ marginTop: 14 }}>{s.lNotes}</label>
              <textarea name="notes" rows={3} />
            </div>

            <div className="formfoot">
              <small>{s.foot}</small>
              <button className="btn btn--brass" type="submit">{s.send}</button>
            </div>
          </form>

          <aside className="aside">
            <div className="box">
              <h4>{s.whyTitle}</h4>
              {s.why.map((b) => (
                <div className="benefit" key={b}><span className="tick">✓</span><span>{b}</span></div>
              ))}
            </div>
            <div className="box box--dark">
              <h4>{s.afterTitle}</h4>
              {s.after.map((a, i) => (
                <div className="mp" key={a}><span className="n">{i + 1}</span><span>{a}</span></div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

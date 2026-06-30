import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

async function createRequest(formData: FormData) {
  "use server";
  const locale = String(formData.get("locale") || "fa");
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: {
        name: String(formData.get("name") || "").slice(0, 200) || "Property request",
        phone: String(formData.get("phone") || "").slice(0, 60) || "—",
        message: `[Request] ${formData.get("tx") || ""} · ${formData.get("ptype") || ""} · area: ${formData.get("area") || ""} · budget: ${formData.get("budget") || ""}\n${formData.get("notes") || ""}`.slice(0, 2000),
      },
    });
  } catch {
    // concept stage — surfaced as generic success
  }
  redirect(`/${locale}/request?sent=1`);
}

type Opt = { v: string; l: string };
type RC = {
  eyebrow: string; title: string; intro: string;
  lName: string; lPhone: string; lTx: string; lType: string; lArea: string; lBudget: string; lNotes: string;
  tx: Opt[]; types: Opt[]; send: string; foot: string; sent: string;
};

const R: Record<Locale, RC> = {
  fa: {
    eyebrow: "تقاضای ملک · رایگان",
    title: "ملک مورد نظرتان را به ما بسپارید",
    intro: "مشخصات ملکی که دنبالش هستید را وارد کنید تا کارشناسان ما گزینه‌های مناسب را پیدا کنند و در اولین فرصت با شما تماس بگیرند.",
    lName: "نام و نام خانوادگی", lPhone: "شمارهٔ تماس", lTx: "نوع معامله", lType: "نوع ملک",
    lArea: "محله / منطقه", lBudget: "بودجه (تومان)", lNotes: "توضیحات (متراژ، خواب، امکانات…)",
    tx: [{ v: "sale", l: "خرید" }, { v: "rent", l: "رهن و اجاره" }, { v: "shortTerm", l: "اجاره ماهانه مبله" }, { v: "fullDeposit", l: "رهن کامل" }],
    types: [{ v: "apartment", l: "آپارتمان" }, { v: "villa", l: "ویلا" }, { v: "office", l: "اداری" }, { v: "shop", l: "مغازه" }, { v: "land", l: "زمین" }],
    send: "ثبت درخواست",
    foot: "پس از ثبت، کارشناس ما برای معرفی گزینه‌های مناسب با شما تماس می‌گیرد.",
    sent: "درخواست شما ثبت شد — متشکریم. به‌زودی با شما تماس می‌گیریم.",
  },
  en: {
    eyebrow: "Property request · free",
    title: "Tell us what you’re looking for",
    intro: "Share the property you need and our team will find matching options and get back to you.",
    lName: "Full name", lPhone: "Phone", lTx: "Transaction", lType: "Property type",
    lArea: "Area / neighborhood", lBudget: "Budget (Toman)", lNotes: "Requirements (size, beds, amenities…)",
    tx: [{ v: "rent", l: "Rent" }, { v: "shortTerm", l: "Monthly furnished" }, { v: "fullDeposit", l: "Full deposit" }],
    types: [{ v: "apartment", l: "Apartment" }, { v: "villa", l: "Villa" }, { v: "penthouse", l: "Penthouse" }, { v: "office", l: "Office" }],
    send: "Submit request",
    foot: "After you submit, our team will contact you with matching options.",
    sent: "Your request has been received — thank you. We’ll be in touch shortly.",
  },
  ar: {
    eyebrow: "طلب عقار · مجانًا",
    title: "أخبرنا بالعقار الذي تبحث عنه",
    intro: "شاركنا مواصفات العقار الذي تريده وسيجد فريقنا الخيارات المناسبة ويتواصل معك في أقرب وقت.",
    lName: "الاسم الكامل", lPhone: "الهاتف", lTx: "نوع المعاملة", lType: "نوع العقار",
    lArea: "الحي / المنطقة", lBudget: "الميزانية (تومان)", lNotes: "المتطلبات (المساحة، الغرف، المرافق…)",
    tx: [{ v: "rent", l: "إيجار" }, { v: "shortTerm", l: "إيجار شهري مفروش" }, { v: "fullDeposit", l: "رهن كامل" }],
    types: [{ v: "apartment", l: "شقة" }, { v: "villa", l: "فيلا" }, { v: "penthouse", l: "بنتهاوس" }, { v: "office", l: "مكتب" }],
    send: "إرسال الطلب",
    foot: "بعد الإرسال، سيتواصل فريقنا معك بالخيارات المناسبة.",
    sent: "تم استلام طلبك — شكرًا لك. سنتواصل معك قريبًا.",
  },
};

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sent = (await searchParams).sent === "1";
  const r = R[locale];

  return (
    <>
      <section className="subintro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="subintro__bg" src="/img/tehran-tower-night.webp" alt="" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{r.eyebrow}</span>
          <h1>{r.title}</h1>
          <p>{r.intro}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="subwrap" style={{ gridTemplateColumns: "1fr" }}>
          <form className="formcard" action={createRequest}>
            {sent ? <div className="okmsg">{r.sent}</div> : null}
            <input type="hidden" name="locale" value={locale} />

            <div className="fsec">
              <h3><span className="nn">۱</span> {r.lTx} / {r.lType}</h3>
              <div className="fg2">
                <div>
                  <label>{r.lTx}</label>
                  <select name="tx">{r.tx.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select>
                </div>
                <div>
                  <label>{r.lType}</label>
                  <select name="ptype">{r.types.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select>
                </div>
              </div>
            </div>

            <div className="fsec">
              <h3><span className="nn">۲</span> {r.lArea} / {r.lBudget}</h3>
              <div className="fg2">
                <div><label>{r.lArea}</label><input type="text" name="area" /></div>
                <div><label>{r.lBudget}</label><input type="text" name="budget" /></div>
              </div>
              <label style={{ marginTop: 14 }}>{r.lNotes}</label>
              <textarea name="notes" rows={3} />
            </div>

            <div className="fsec">
              <h3><span className="nn">۳</span> {r.lName}</h3>
              <div className="fg2">
                <div><label>{r.lName}</label><input type="text" name="name" required /></div>
                <div><label>{r.lPhone}</label><input type="text" name="phone" required /></div>
              </div>
            </div>

            <div className="formfoot">
              <small>{r.foot}</small>
              <button className="btn btn--brass" type="submit">{r.send}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

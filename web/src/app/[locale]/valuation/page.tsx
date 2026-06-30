import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

async function createValuation(formData: FormData) {
  "use server";
  const locale = String(formData.get("locale") || "fa");
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: {
        name: String(formData.get("name") || "").slice(0, 200) || "Valuation request",
        phone: String(formData.get("phone") || "").slice(0, 60) || "—",
        message: `[Valuation] ${formData.get("ptype") || ""} · ${formData.get("area") || ""}m · ${formData.get("addr") || ""}\n${formData.get("notes") || ""}`.slice(0, 2000),
      },
    });
  } catch {
    // concept stage
  }
  redirect(`/${locale}/valuation?sent=1`);
}

type Opt = { v: string; l: string };
type VC = { eyebrow: string; title: string; intro: string; lName: string; lPhone: string; lType: string; lArea: string; lAddr: string; lNotes: string; types: Opt[]; send: string; foot: string; sent: string };
const V: Record<Locale, VC> = {
  fa: { eyebrow: "ارزیابی رایگان ملک", title: "ارزش ملک خود را بدانید", intro: "مشخصات ملک‌تان را وارد کنید تا کارشناسان ما ارزیابی دقیق و رایگانی بر اساس نرخ روز بازار در اختیارتان بگذارند.", lName: "نام و نام خانوادگی", lPhone: "شمارهٔ تماس", lType: "نوع ملک", lArea: "متراژ (متر)", lAddr: "محله / منطقه", lNotes: "توضیحات (سال ساخت، امکانات…)", types: [{ v: "apartment", l: "آپارتمان" }, { v: "villa", l: "ویلا" }, { v: "office", l: "اداری" }, { v: "shop", l: "مغازه" }, { v: "land", l: "زمین" }, { v: "tower", l: "برج و پنت‌هاوس" }], send: "درخواست ارزیابی", foot: "ارزیابی رایگان است و کارشناس ما برای هماهنگی با شما تماس می‌گیرد.", sent: "درخواست ارزیابی ثبت شد — متشکریم. به‌زودی با شما تماس می‌گیریم." },
  en: { eyebrow: "Free property valuation", title: "Know what your property is worth", intro: "Share your property details and our specialists will give you a precise, free valuation based on the current market.", lName: "Full name", lPhone: "Phone", lType: "Property type", lArea: "Area (m²)", lAddr: "Area / neighborhood", lNotes: "Notes (year built, amenities…)", types: [{ v: "apartment", l: "Apartment" }, { v: "villa", l: "Villa" }, { v: "office", l: "Office" }, { v: "shop", l: "Shop" }, { v: "land", l: "Land" }, { v: "tower", l: "Tower / penthouse" }], send: "Request valuation", foot: "The valuation is free; our specialist will call you to arrange it.", sent: "Valuation request received — thank you. We’ll be in touch shortly." },
  ar: { eyebrow: "تقييم عقاري مجاني", title: "اعرف قيمة عقارك", intro: "شاركنا تفاصيل عقارك وسيقدّم لك خبراؤنا تقييمًا دقيقًا ومجانيًا وفق سعر السوق الحالي.", lName: "الاسم الكامل", lPhone: "الهاتف", lType: "نوع العقار", lArea: "المساحة (م²)", lAddr: "الحي / المنطقة", lNotes: "ملاحظات (سنة البناء، المرافق…)", types: [{ v: "apartment", l: "شقة" }, { v: "villa", l: "فيلا" }, { v: "office", l: "مكتب" }, { v: "shop", l: "محل" }, { v: "land", l: "أرض" }, { v: "tower", l: "برج / بنتهاوس" }], send: "طلب تقييم", foot: "التقييم مجاني وسيتصل بك خبيرنا لترتيبه.", sent: "تم استلام طلب التقييم — شكرًا لك. سنتواصل معك قريبًا." },
};

export default async function ValuationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sent = (await searchParams).sent === "1";
  const v = V[locale];

  return (
    <>
      <section className="subintro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="subintro__bg" src="/img/tehran-tower-night.webp" alt="" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{v.eyebrow}</span>
          <h1>{v.title}</h1>
          <p>{v.intro}</p>
        </div>
      </section>
      <div className="wrap">
        <div className="subwrap" style={{ gridTemplateColumns: "1fr" }}>
          <form className="formcard" action={createValuation}>
            {sent ? <div className="okmsg">{v.sent}</div> : null}
            <input type="hidden" name="locale" value={locale} />
            <div className="fsec">
              <h3><span className="nn">۱</span> {v.lType} / {v.lArea}</h3>
              <div className="fg2">
                <div><label>{v.lType}</label><select name="ptype">{v.types.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
                <div><label>{v.lArea}</label><input type="number" name="area" /></div>
              </div>
              <label style={{ marginTop: 14 }}>{v.lAddr}</label>
              <input type="text" name="addr" />
              <label style={{ marginTop: 14 }}>{v.lNotes}</label>
              <textarea name="notes" rows={3} />
            </div>
            <div className="fsec">
              <h3><span className="nn">۲</span> {v.lName}</h3>
              <div className="fg2">
                <div><label>{v.lName}</label><input type="text" name="name" required /></div>
                <div><label>{v.lPhone}</label><input type="text" name="phone" required /></div>
              </div>
            </div>
            <div className="formfoot"><small>{v.foot}</small><button className="btn btn--brass" type="submit">{v.send}</button></div>
          </form>
        </div>
      </div>
    </>
  );
}

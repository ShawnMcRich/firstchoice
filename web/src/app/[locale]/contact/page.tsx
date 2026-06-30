import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { getPayloadClient } from "@/lib/payload";

async function createContact(formData: FormData) {
  "use server";
  const locale = String(formData.get("locale") || "fa");
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: {
        name: String(formData.get("name") || "").slice(0, 200) || "Contact",
        phone: String(formData.get("phone") || "").slice(0, 60) || "—",
        message: `[Contact] ${formData.get("email") || ""}\n${formData.get("message") || ""}`.slice(0, 2000),
      },
    });
  } catch {
    // concept stage
  }
  redirect(`/${locale}/contact?sent=1`);
}

const C: Record<Locale, { eyebrow: string; title: string; intro: string; reach: string; form: string; lName: string; lPhone: string; lEmail: string; lMsg: string; send: string; sent: string; tel: string; mob: string; fax: string; mail: string; addr: string }> = {
  fa: { eyebrow: "تماس با ما", title: "در ارتباط باشید", intro: "برای مشاوره، بازدید یا هر پرسش ملکی، از راه‌های زیر با ما در تماس باشید.", reach: "راه‌های ارتباط", form: "ارسال پیام", lName: "نام", lPhone: "تلفن", lEmail: "ایمیل", lMsg: "پیام شما", send: "ارسال", sent: "پیام شما ارسال شد — متشکریم. به‌زودی پاسخ می‌دهیم.", tel: "تلفن", mob: "همراه", fax: "نمابر", mail: "ایمیل", addr: "نشانی" },
  en: { eyebrow: "Contact us", title: "Get in touch", intro: "For advice, a viewing or any property question, reach us through any of the channels below.", reach: "Ways to reach us", form: "Send a message", lName: "Name", lPhone: "Phone", lEmail: "Email", lMsg: "Your message", send: "Send", sent: "Your message has been sent — thank you. We’ll reply shortly.", tel: "Tel", mob: "Mobile", fax: "Fax", mail: "Email", addr: "Address" },
  ar: { eyebrow: "اتصل بنا", title: "تواصل معنا", intro: "للاستشارة أو المعاينة أو أي سؤال عقاري، تواصل معنا عبر أي من الوسائل التالية.", reach: "وسائل التواصل", form: "إرسال رسالة", lName: "الاسم", lPhone: "الهاتف", lEmail: "البريد", lMsg: "رسالتك", send: "إرسال", sent: "تم إرسال رسالتك — شكرًا لك. سنرد قريبًا.", tel: "هاتف", mob: "جوال", fax: "فاكس", mail: "بريد", addr: "العنوان" },
};

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sent = (await searchParams).sent === "1";
  const t = await getDictionary(locale);
  const c = C[locale];
  const ct = t.contact;
  const num = (n: string) => <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{n}</span>;

  return (
    <>
      <section className="subintro">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="subintro__bg" src="/img/tehran-tower-night.webp" alt="" />
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>{c.eyebrow}</span>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      <div className="wrap">
        <div className="subwrap">
          <form className="formcard" action={createContact}>
            {sent ? <div className="okmsg">{c.sent}</div> : null}
            <input type="hidden" name="locale" value={locale} />
            <h3 style={{ marginBottom: 14 }}>{c.form}</h3>
            <div className="fg2">
              <div><label>{c.lName}</label><input type="text" name="name" required /></div>
              <div><label>{c.lPhone}</label><input type="text" name="phone" required /></div>
            </div>
            <label style={{ marginTop: 14 }}>{c.lEmail}</label>
            <input type="email" name="email" />
            <label style={{ marginTop: 14 }}>{c.lMsg}</label>
            <textarea name="message" rows={4} />
            <div className="formfoot"><span /><button className="btn btn--brass" type="submit">{c.send}</button></div>
          </form>
          <aside className="aside">
            <div className="box">
              <h4>{c.reach}</h4>
              <div className="cinfo">
                <span>{c.tel}</span>
                <div>{ct.phones.map((p, i) => (<a key={p} href={`tel:${ct.phoneHrefs[i] ?? ct.phoneHrefs[0]}`}>{num(p)}</a>))}</div>
                <span>{c.mob}</span><a href={`tel:${ct.mobileHref}`}>{num(ct.mobile)}</a>
                <span>{c.fax}</span><div>{num(ct.fax)}</div>
                <span>{c.mail}</span><div>{ct.emails.map((e) => (<a key={e} href={`mailto:${e}`}>{e}</a>))}</div>
                <span>{c.addr}</span><div>{ct.address}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

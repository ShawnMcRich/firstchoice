import type { Metadata } from "next";
import { Vazirmatn, Fraunces, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, dir, locales } from "@/i18n/config";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", style: ["normal", "italic"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "fa";
  const dict = await getDictionary(loc);
  return {
    metadataBase: new URL("https://firstchoiceco.com"),
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
    alternates: {
      canonical: `/${loc}`,
      languages: { fa: "/fa", en: "/en", ar: "/ar", "x-default": "/fa" },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDesc,
      url: `/${loc}`,
      siteName: "First Choice Real Estate · انتخاب اول",
      locale: loc,
      type: "website",
    },
  };
}

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "First Choice Real Estate — انتخاب اول",
  url: "https://firstchoiceco.com",
  telephone: "+982122041212",
  faxNumber: "+982126201635",
  email: "property@firstchoiceco.com",
  foundingDate: "1988",
  areaServed: "IR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 24, East Nahid Blvd, Africa St (Jordan), Amanieh, District 3",
    addressLocality: "Tehran",
    postalCode: "1915684831",
    addressCountry: "IR",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir(locale)} className={`${vazir.variable} ${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
        <SiteHeader locale={locale} dict={dict} />
        <main>{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}

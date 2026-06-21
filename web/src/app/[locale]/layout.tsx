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
  const dict = await getDictionary(isLocale(locale) ? locale : "fa");
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
  };
}

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
        <SiteHeader locale={locale} dict={dict} />
        <main>{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}

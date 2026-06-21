import type { Where } from "payload";
import { getPayloadClient } from "./payload";
import type { Locale } from "@/i18n/config";

export type CardListing = {
  id: string;
  href: string;
  title: string;
  loc: string;
  price: string;
  unit: string;
  badge: string;
  specs: string[];
  image?: string;
  featured?: boolean;
};

type ListingDoc = {
  id: string | number;
  title?: string;
  transactionType?: string;
  propertyType?: string;
  city?: string;
  neighborhood?: string;
  area?: number;
  bedrooms?: number;
  floor?: number;
  price?: number;
  deposit?: number;
  rent?: number;
  currency?: string;
  featured?: boolean;
  images?: Array<{ url?: string; sizes?: { card?: { url?: string } } } | string | number>;
};

const TX_LABEL: Record<string, Record<Locale, string>> = {
  sale: { fa: "فروش", en: "For sale", ar: "للبيع" },
  rent: { fa: "رهن و اجاره", en: "Rent", ar: "إيجار" },
  fullDeposit: { fa: "رهن کامل", en: "Full deposit", ar: "رهن كامل" },
  swap: { fa: "معاوضه", en: "Swap", ar: "مقايضة" },
  partnership: { fa: "مشارکت در ساخت", en: "Partnership", ar: "مشاركة" },
};

const intlLocale = (l: Locale) => (l === "en" ? "en-US" : l === "ar" ? "ar-EG" : "fa-IR");
const fmt = (n: number | undefined, l: Locale) => (typeof n === "number" ? n.toLocaleString(intlLocale(l)) : "");

function firstImage(images: ListingDoc["images"]): string | undefined {
  const first = images?.[0];
  if (first && typeof first === "object") return first.sizes?.card?.url ?? first.url ?? undefined;
  return undefined;
}

// Context-aware placeholder by property type, used when a listing has no photo.
const PLACEHOLDER: Record<string, string> = {
  apartment: "apartment", suite: "apartment", room: "apartment",
  villa: "villa", kolangi: "villa",
  penthouse: "penthouse",
  tower: "tower", wholeBuilding: "tower",
  land: "land",
  shop: "shop", showroom: "shop",
  officeDeed: "office", officeLocation: "office", factory: "office",
};
export function placeholderFor(propertyType?: string): string {
  return `/img/placeholders/${(propertyType && PLACEHOLDER[propertyType]) || "default"}.webp`;
}

function specs(doc: ListingDoc, l: Locale): string[] {
  const u = { fa: ["متر", "خواب", "طبقه"], en: ["m²", "beds", "Floor"], ar: ["م²", "غرف", "الطابق"] }[l];
  const out: string[] = [];
  if (doc.area) out.push(`${fmt(doc.area, l)} ${u[0]}`);
  if (doc.bedrooms) out.push(`${fmt(doc.bedrooms, l)} ${u[1]}`);
  if (doc.floor) out.push(l === "fa" ? `${u[2]} ${fmt(doc.floor, l)}` : `${u[2]} ${fmt(doc.floor, l)}`);
  return out;
}

function toCard(doc: ListingDoc, l: Locale): CardListing {
  const tomanLabel = { fa: "تومان", en: "Toman", ar: "تومان" }[l];
  const isRent = doc.transactionType === "rent" || doc.transactionType === "fullDeposit";
  const unit = isRent ? { fa: "ودیعه", en: "deposit", ar: "وديعة" }[l] : doc.currency === "usd" ? "USD" : doc.currency === "eur" ? "EUR" : tomanLabel;
  const price = isRent ? fmt(doc.deposit ?? doc.rent, l) : fmt(doc.price, l);
  return {
    id: String(doc.id),
    href: `/${l}/listing/${doc.id}`,
    title: doc.title ?? "",
    loc: [doc.city, doc.neighborhood].filter(Boolean).join(" · "),
    price,
    unit,
    badge: TX_LABEL[doc.transactionType ?? "sale"]?.[l] ?? "",
    specs: specs(doc, l),
    image: firstImage(doc.images) ?? placeholderFor(doc.propertyType),
    featured: Boolean(doc.featured),
  };
}

export async function getFeatured(locale: Locale, limit = 3): Promise<CardListing[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "listings",
      locale,
      depth: 1,
      limit,
      where: { and: [{ status: { equals: "published" } }, { featured: { equals: true } }] },
    });
    return (res.docs as ListingDoc[]).map((d) => toCard(d, locale));
  } catch {
    return [];
  }
}

export async function searchListings(
  opts: { transactionType?: string; propertyType?: string; q?: string; limit?: number },
  locale: Locale,
): Promise<CardListing[]> {
  try {
    const payload = await getPayloadClient();
    const where: Where = { status: { equals: "published" } };
    if (opts.transactionType) where.transactionType = { equals: opts.transactionType };
    if (opts.propertyType) where.propertyType = { equals: opts.propertyType };
    if (opts.q) where.or = [{ title: { like: opts.q } }, { city: { like: opts.q } }, { neighborhood: { like: opts.q } }];
    const res = await payload.find({
      collection: "listings",
      locale,
      depth: 1,
      limit: opts.limit ?? 24,
      where,
    });
    return (res.docs as ListingDoc[]).map((d) => toCard(d, locale));
  } catch {
    return [];
  }
}

export async function getListingById(id: string, locale: Locale): Promise<Record<string, unknown> | null> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findByID({ collection: "listings", id, locale, depth: 2 });
    return doc as Record<string, unknown>;
  } catch {
    return null;
  }
}

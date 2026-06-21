import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE = "https://firstchoiceco.com";
const PATHS = ["", "/search", "/about", "/diplomatic", "/submit"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const p of PATHS) {
    for (const l of locales) {
      entries.push({
        url: `${BASE}/${l}${p}`,
        changeFrequency: p === "/search" ? "daily" : "weekly",
        priority: p === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(locales.map((x) => [x, `${BASE}/${x}${p}`])),
        },
      });
    }
  }
  return entries;
}

// Free-market FX rates (Toman per unit) sourced from tgju.org.
// Runs server-side on the Tehran host, where these endpoints are reachable,
// and is revalidated hourly. Falls back to a constant if the source is down.

const ENDPOINT = (key: string) =>
  `https://api.tgju.org/v1/market/indicator/summary-table-data/${key}`;

export type Rates = { usd: number; eur: number; asOf: string; asOfJalali: string; live: boolean };

// Conservative fallback in Toman (used only if tgju is unreachable).
const FALLBACK: Rates = { usd: 160000, eur: 183000, asOf: "", asOfJalali: "", live: false };

async function fetchOne(key: string): Promise<{ toman: number; greg: string; jalali: string } | null> {
  try {
    const res = await fetch(ENDPOINT(key), {
      next: { revalidate: 3600 },
      headers: { "user-agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: string[][] };
    const row = json?.data?.[0];
    if (!row) return null;
    const rial = Number(String(row[0]).replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(rial) || rial <= 0) return null;
    return { toman: Math.round(rial / 10), greg: String(row[6] ?? ""), jalali: String(row[7] ?? "") };
  } catch {
    return null;
  }
}

export async function getRates(): Promise<Rates> {
  const [usd, eur] = await Promise.all([fetchOne("price_dollar_rl"), fetchOne("price_eur")]);
  if (!usd || !eur) return FALLBACK;
  return { usd: usd.toman, eur: eur.toman, asOf: usd.greg, asOfJalali: usd.jalali, live: true };
}

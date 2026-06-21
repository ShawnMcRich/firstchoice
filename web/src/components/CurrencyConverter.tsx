"use client";

import { useState } from "react";

type Cur = "toman" | "usd" | "eur";

export function CurrencyConverter({
  locale,
  rates,
  labels,
}: {
  locale: string;
  rates: { usd: number; eur: number };
  labels: {
    amount: string;
    toman: string;
    usd: string;
    eur: string;
    inToman: string;
    inUsd: string;
    inEur: string;
    rate: string;
  };
}) {
  const intl = locale === "en" ? "en-US" : locale === "ar" ? "ar-EG" : "fa-IR";
  const [amount, setAmount] = useState<number>(1_000_000_000);
  const [cur, setCur] = useState<Cur>("toman");

  const toToman = cur === "toman" ? amount : cur === "usd" ? amount * rates.usd : amount * rates.eur;
  const usd = toToman / rates.usd;
  const eur = toToman / rates.eur;
  const fmt = (n: number, max = 0) =>
    Number.isFinite(n) ? n.toLocaleString(intl, { maximumFractionDigits: max }) : "—";

  return (
    <div className="conv">
      <div className="row">
        <div style={{ flex: 2 }}>
          <label>{labels.amount}</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div style={{ flex: 1 }}>
          <label>&nbsp;</label>
          <select value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
            <option value="toman">{labels.toman}</option>
            <option value="usd">{labels.usd}</option>
            <option value="eur">{labels.eur}</option>
          </select>
        </div>
      </div>
      <div className="convout">
        <div><span>{labels.inToman}</span><b>{fmt(toToman)}</b></div>
        <div><span>{labels.inUsd}</span><b>{fmt(usd, 2)}</b></div>
        <div><span>{labels.inEur}</span><b>{fmt(eur, 2)}</b></div>
      </div>
      <div className="rate">{labels.rate}</div>
    </div>
  );
}

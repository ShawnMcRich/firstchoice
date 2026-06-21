"use client";

import { useState } from "react";

// Iranian convention: ~3% per month — every 1,000,000 toman of deposit ≈ 30,000 toman rent.
const RATE = 0.03;

export function RentDepositConverter({
  locale,
  depositLabel,
  rentLabel,
  rateNote,
  summary,
}: {
  locale: string;
  depositLabel: string;
  rentLabel: string;
  rateNote: string;
  summary: string;
}) {
  const intl = locale === "en" ? "en-US" : locale === "ar" ? "ar-EG" : "fa-IR";
  const [deposit, setDeposit] = useState(1_000_000_000);
  const [rent, setRent] = useState(Math.round(1_000_000_000 * RATE));
  const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n).toLocaleString(intl) : "—");

  return (
    <div className="conv">
      <div className="row">
        <div>
          <label>{depositLabel}</label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => {
              const v = Number(e.target.value);
              setDeposit(v);
              setRent(Math.round(v * RATE));
            }}
          />
        </div>
        <span className="swap" aria-hidden>⇄</span>
        <div>
          <label>{rentLabel}</label>
          <input
            type="number"
            value={rent}
            onChange={(e) => {
              const v = Number(e.target.value);
              setRent(v);
              setDeposit(Math.round(v / RATE));
            }}
          />
        </div>
      </div>
      <div className="rate">{summary.replace("{deposit}", fmt(deposit)).replace("{rent}", fmt(rent))}</div>
      <div className="rate">{rateNote}</div>
    </div>
  );
}

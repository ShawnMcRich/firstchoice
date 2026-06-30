import Link from "next/link";
import type { Locale } from "@/i18n/config";

const NAME: Record<Locale, string> = { fa: "آژانس املاک انتخاب اول", en: "First Choice", ar: "الخيار الأول" };
const SUB: Record<Locale, string> = {
  fa: "First Choice · Real Estate",
  en: "Real Estate · Tehran",
  ar: "First Choice · Real Estate",
};

export function Brand({
  href,
  locale,
  reversed = false,
}: {
  href: string;
  locale: Locale;
  reversed?: boolean;
}) {
  return (
    <Link className="brand" href={href} aria-label={NAME[locale]}>
      <svg className={reversed ? "mark mark--rev" : "mark"} viewBox="0 0 120 120" aria-hidden="true">
        <rect className="mk-sq" x="3" y="3" width="114" height="114" rx="18" />
        <rect className="mk-fr" x="11" y="11" width="98" height="98" rx="10" fill="none" strokeWidth="1.4" />
        {/* the "1" */}
        <path className="mk-one" d="M69 30 L69 84 L80 84 L80 92 L40 92 L40 84 L55 84 L55 47 L41 52 Z" />
        {/* ordinal "st" */}
        <text className="mk-st" x="81" y="42" fontSize="18" fontWeight="700">st</text>
        {/* CHOICE ribbon across the 1 (swallowtail ends, no protruding wings) */}
        <polygon className="mk-rb" points="18,60 102,60 96,69 102,78 18,78 24,69" />
        <text className="mk-ch" x="60" y="73.5" textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.6">CHOICE</text>
      </svg>
      <span className="brand__wm">
        <span className={`brand__name brand__name--${locale}`}>{NAME[locale]}</span>
        <span className="brand__sub">{SUB[locale]}</span>
      </span>
    </Link>
  );
}

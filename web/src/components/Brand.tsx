import Link from "next/link";

export function Brand({ href, reversed = false }: { href: string; reversed?: boolean }) {
  return (
    <Link className="brand" href={href}>
      <svg className={reversed ? "mark mark--rev" : "mark"} viewBox="0 0 120 120" aria-hidden="true">
        <rect className="mk-sq" x="4" y="4" width="112" height="112" rx="12" />
        <rect className="mk-fr" x="13" y="13" width="94" height="94" rx="7" fill="none" strokeWidth="1.4" opacity="0.85" />
        <path className="mk-one" d="M69 30 L69 84 L80 84 L80 92 L40 92 L40 84 L55 84 L55 47 L41 52 Z" />
      </svg>
      <span>
        <span className="brand__fa">انتخاب اول</span>
        <span className="brand__en">First Choice · Real Estate</span>
      </span>
    </Link>
  );
}

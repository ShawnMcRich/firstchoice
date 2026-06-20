# First Choice Real Estate — Project Brief
**انتخاب اول · املاک**
Owner / Manager: **Dariush Ghanizadeh** — Tehran, Iran
Last updated: 2026-06-21 · Status: pre-build (art direction for approval)

---

## 1. The business
- Established **~۱۳۸۳ / 2004** (20+ years). Tehran agency, strong north-Tehran / luxury focus.
- **Public identity / contact:** Public domain **firstchoiceco.com** (note: GitHub repo is `firstchoice`). Office: No. 24, East Nahid Blvd, Africa St (Jordan), Amanieh, District 3, Tehran — کدپستی **1915684831**. Phones: 021-2204-1212 · 021-2202-1616 · 021-2205-3232 · 021-2205-6621 · mobile 0912-108-1212. Email: **property@firstchoiceco.com**.
- Three service lines:
  1. **Buy / sell & rent** — خرید و فروش، رهن و اجاره، رهن کامل.
  2. **Flagship — Diplomatic & Corporate Relocation:** housing diplomats, consular staff, and foreign-company employees during their posting in Tehran. High-value, high-trust, almost zero online competition in English.
  3. **Brand & credibility** presence for the agency.

## 2. Vision & principles (non-negotiable)
- **Premium, editorial — no "AI slop."** Restraint, generous whitespace, real photography, crafted detail. Explicitly banned: purple/violet "tech" gradients, glassmorphism-everywhere, floating 3D blobs, emoji icons, default `rounded-xl + drop-shadow` shadcn look, bouncy spring animation, fake stock-photo vibe, machine-translated copy.
- **Amazingly fast** — see budgets in §10.
- **Bilingual EN + FA**, true RTL, full content parity (not a translation afterthought).
- **Best-in-class UX**, mobile-first, super user-friendly.

## 3. Audiences
1. **Local** buyers / renters / sellers (Tehran) — Persian-first.
2. **Diplomatic missions, consulates, international companies** — English-first flagship.
3. **Iranian diaspora & foreign investors** buying/leasing in Tehran — English.

## 4. Brand
- **Logo decision: keep the ownable "1"** (1 → 1st → First → اول → انتخاب اول — bridges both names & both languages). Redraw as **vector**; drop the ribbon; unify the type; add a **bilingual lockup** (انتخاب اول / First Choice Real Estate). The "1" mark is reused as **favicon, social avatar, and photo watermark**. Original kept at `brand/logo-original.png`; refreshed mark at `brand/mark.svg`.
- **Palette — chosen lead = Direction A, "Refined heritage":** deep **aubergine / royal indigo** + warm **ivory** + **brass** accent. Evolves the 22-year-old purple into something expensive instead of dated.
  - `aubergine #2E2350` · `ink #1A1622` · `ivory #F6F2EA` · `paper #FBF9F5` · `brass #B68D4C` · `muted #6E6880`
  - Alternatives kept for side-by-side comparison: **B — Ink & brass** (charcoal + ivory + brass), **C — Deep emerald** (forest green + ivory + soft gold).
- **Typography:** Latin display **Fraunces** (serif), Latin UI **Manrope**; Persian **Vazirmatn**. *Production:* license/refine a premium Persian display face (Morabba / Kalameh / Estedad) for headlines; self-host **subsetted woff2**. Never letter-space Persian (breaks joining); use correct **نیم‌فاصله (ZWNJ)** and Persian numerals.
- **Voice:** confident, discreet, expert. Natural Persian + first-class English.

## 5. Goals & phasing
All three goals are in scope; phased so we ship something impeccably premium **fast** rather than boil the ocean.

**Phase 1 — Premium core (launch)**
- Brand refresh applied site-wide; bilingual shell (FA/EN, RTL, hreflang) with context-preserving language toggle.
- Home (premium).
- Listings index: filters on the real Iranian model (خرید / رهن و اجاره / رهن کامل, neighborhood, type, price, beds, area, furnished), sort, **Neshan map search**.
- Listing detail: gallery, full Iranian spec set, share (WhatsApp/Telegram/copy), favorites (no login), similar listings, one-tap contact, multi-currency display, Shamsi dates. **rهن↔اجاره converter on rental listings** (deposit↔rent — the tool buyers here actually use); price-per-meter + commission/transfer-tax helper on sales. (No Western mortgage calculator — bank housing loans are negligible vs. luxury prices here.)
- **Neighborhood landing pages** (top ~8 areas) — SEO + expat-useful.
- **International / Diplomatic Relocation** flagship section (EN-first) + private enquiry.
- **سپردن ملک** submission wizard → moderation queue.
- Agent dashboard: listing CRUD with image-normalization pipeline, moderation queue, per-agent **leads inbox** + status tracker.
- Trust: about/heritage, team, contact + **Neshan map**, seal placeholders (اینماد / ساماندهی / اتحادیه املاک).
- SEO core: schema, hreflang, sitemaps, **OG link previews**, Search Console; self-hosted analytics; **Turnstile** (not reCAPTCHA). Performance budgets enforced.

**Phase 2 — Content & growth**
- Content engine: process/legal guides (FA+EN), **expat/diplomatic guides (EN)**, market reports, **price index with charts**, glossary, FAQ (schema), blog.
- Saved searches + **price alerts**; optional accounts to sync favorites; **compare**; per-listing **PDF brochure**.
- **Off-market / private listings** (by request) — diplomatic & ultra-luxury discretion.
- Expanded neighborhoods; Bing Webmaster; internal-linking buildout; richer agent CRM statuses + per-listing analytics.

**Phase 3 — Scale & integrations**
- Instagram feed, **Divar / Sheypoor syndication**, newsletter ESP.
- 360° / video tours; multi-agent portal breadth; personalization; A/B testing.
- Optional payments for featured listings (ZarinPal + Enamad) — only if monetizing placement.

## 6. Information architecture
Home · Listings (خرید / رهن و اجاره / رهن کامل) · Listing detail · Neighborhoods (+ per-area guides) · **International / Diplomatic Relocation** · Tools (rهن↔اجاره converter, commission/transfer-tax helper) · Content hub (guides, market reports, glossary, FAQ, blog) · About / heritage · Team · Contact · **سپردن ملک** · Agent dashboard · Legal (privacy / terms).

## 7. Feature highlights (the non-obvious musts)
- **Shamsi (Jalali) calendar** on the FA side; Gregorian on EN. (Mandatory.)
- **Gorgeous OG link previews** — Iran's sharing runs on WhatsApp/Telegram/Instagram; a shared listing must render as a premium card.
- **Heritage/longevity story** ("از سال ۱۳۸۳ · 20+ years") as a trust pillar.
- **Union & license display** (عضویت اتحادیه املاک، جواز کسب، کد رهگیری).
- Toman/Rial + Persian-numeral toggle; **multi-currency** (USD/EUR) for international.
- Domestic messenger fallbacks (Eitaa/Bale) beside WhatsApp/Telegram.
- Image-normalization pipeline (fixed aspect ratios, auto-crop, min-resolution gate) so mixed pro + phone photos stay cohesive.
- Off-market private collection; "recently transacted" social proof; favorites without forced login.

## 8. Diplomatic flagship (spec)
- Dedicated EN-first section + FA. Services: vetted/secure homes, **furnished & short/medium-term leases**, lease negotiation, **English contracts**, area orientation, utilities & internet setup, security guidance.
- Filters: furnished, short-term, **proximity to embassies / international schools / foreign-friendly hospitals**, the north-Tehran **embassy belt** (Elahiyeh, Zafaraniyeh, Farmanieh, Niavaran, Aghdasiyeh).
- **Discretion:** off-market/private listings by request; private enquiry channel; discreet testimonials ("trusted by diplomatic missions & international companies").
- **Multi-currency** budgeting; English-speaking contact; time-zone-aware for diaspora.

## 9. Content & SEO strategy
- Don't fight Divar/Kilid on head terms. Win on: **brand** ("املاک انتخاب اول" / "Dariush Ghanizadeh"), **hyper-local long-tail** (neighborhood × type × transaction), **tools/guides**, and **English diplomatic/expat** queries (near-zero competition).
- Pillars: neighborhood guides, process/legal guides (FA+EN), expat guides (EN), market reports/price index, tools-as-content, glossary, FAQ.
- Technical: hreflang fa-IR/en, full schema (RealEstateAgent, Offer/Residence, FAQ, Article, Person, Review, VideoObject, Breadcrumb), split sitemaps, OG previews, internal linking, bilingual alt text, Search Console + Bing. Funnel Instagram/Divar traffic to the site for trust & conversion.

## 10. Tech, infra & performance
- **Next.js (App Router)** + **self-hosted CMS** (Payload or Strapi) — avoids sanctioned SaaS.
- Hosting: **ArvanCloud** (fast in Iran) + **Cloudflare** (fast abroad); domains **`.ir` + `.com`**.
- **Neshan** maps; **Cloudflare Turnstile**; self-hosted analytics (Plausible/Umami/Matomo); self-hosted subsetted **woff2** fonts.
- **Performance budgets (acceptance criteria):** LCP ≤ **2.0s** (4G mobile), INP ≤ **200ms**, CLS ≤ **0.05**; AVIF/WebP responsive images, blur placeholders, priority hero/lazy below fold; minimal JS on listing pages; dual-CDN edge cache; **Lighthouse budgets in CI**.

## 11. Non-functional
WCAG **AA**; full keyboard + RTL/LTR; privacy / terms / cookie notice (EU diplomat visitors); upload security + image normalization; backups; premium 404 / empty states.

## 12. Open items / to verify
- Current FA filtering status (WhatsApp / Telegram / Instagram) + domestic fallbacks.
- Premium Persian **display font** licensing.
- **Photography plan** (pro for hero/featured; quality gate for mixed uploads).
- **Enamad (اینماد) + Samandehi (ساماندهی) + اتحادیه** registration.
- Real listing **data source / migration** (current Divar/Instagram inventory?).

## 13. Next steps
1. **Approve art direction** → `design/art-direction.html` (palette A vs B/C, logo refresh).
2. Finalize the vector logo (outline the wordmark for production).
3. Scaffold **Next.js + CMS**; build **Phase 1**.

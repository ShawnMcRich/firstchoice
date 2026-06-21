// Shared option sets, mirroring the owner's taxonomy (docs/owner-notes).

export const transactionTypeOptions = [
  { label: "فروش", value: "sale" },
  { label: "رهن و اجاره", value: "rent" },
  { label: "اجارهٔ کوتاه‌مدت", value: "shortTerm" },
  { label: "رهن کامل", value: "fullDeposit" },
  { label: "معاوضه", value: "swap" },
  { label: "مشارکت در ساخت", value: "partnership" },
];

export const propertyTypeOptions = [
  { label: "آپارتمان", value: "apartment" },
  { label: "ویلا", value: "villa" },
  { label: "پنت‌هاوس", value: "penthouse" },
  { label: "سوئیت", value: "suite" },
  { label: "برج", value: "tower" },
  { label: "کلنگی", value: "kolangi" },
  { label: "زمین", value: "land" },
  { label: "مغازه", value: "shop" },
  { label: "دفتر (سند اداری)", value: "officeDeed" },
  { label: "دفتر (موقعیت اداری)", value: "officeLocation" },
  { label: "ساختمان یکجا", value: "wholeBuilding" },
  { label: "اتاق", value: "room" },
  { label: "کارخانه", value: "factory" },
  { label: "نمایشگاه", value: "showroom" },
];

export const amenityOptions = [
  { label: "آب", value: "water" },
  { label: "برق", value: "power" },
  { label: "گاز", value: "gas" },
  { label: "پارکینگ", value: "parking" },
  { label: "آسانسور", value: "elevator" },
  { label: "انباری", value: "storage" },
  { label: "درب ضد سرقت", value: "securityDoor" },
  { label: "تلفن", value: "phone" },
  { label: "شوفاژ", value: "radiator" },
  { label: "شومینه", value: "fireplace" },
  { label: "پکیج", value: "packageHeater" },
  { label: "کولر", value: "cooler" },
  { label: "سونا", value: "sauna" },
  { label: "استخر", value: "pool" },
  { label: "جکوزی", value: "jacuzzi" },
  { label: "آیفون تصویری", value: "videoIntercom" },
  { label: "دوربین مدار بسته", value: "cctv" },
  { label: "درب ریموت", value: "remoteDoor" },
  { label: "آنتن مرکزی", value: "centralAntenna" },
  { label: "پاسیو", value: "patio" },
  { label: "باربیکیو", value: "bbq" },
  { label: "بالکن", value: "balcony" },
  { label: "حیاط", value: "yard" },
  { label: "لابی", value: "lobby" },
  { label: "سالن اجتماعات", value: "hall" },
  { label: "سرایداری", value: "concierge" },
  { label: "مبله", value: "furnished" },
  { label: "اطفاء حریق", value: "fireSystem" },
  { label: "آب چاه", value: "wellWater" },
  { label: "وام‌پذیر", value: "loanEligible" },
];

export const deedTypeOptions = [
  { label: "تک‌برگ", value: "singlePage" },
  { label: "شش‌دانگ", value: "sixDang" },
  { label: "قول‌نامه‌ای", value: "agreement" },
  { label: "سایر", value: "other" },
];

export const currencyOptions = [
  { label: "تومان", value: "toman" },
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
];

export const peopleRoleOptions = [
  { label: "مشتری (خریدار)", value: "customer" },
  { label: "مستأجر", value: "tenant" },
  { label: "مالک", value: "owner" },
  { label: "موجر", value: "landlord" },
];

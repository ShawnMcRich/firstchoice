import type { CollectionConfig } from "payload";
import { readListings, isStaff, isAdmin, isAdminField } from "./access";
import {
  transactionTypeOptions,
  propertyTypeOptions,
  amenityOptions,
  deedTypeOptions,
  currencyOptions,
} from "./options";

export const Listings: CollectionConfig = {
  slug: "listings",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "transactionType", "city", "price", "status"],
    group: "املاک",
    listSearchableFields: ["title", "code", "city", "neighborhood"],
  },
  access: {
    read: readListings,
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      type: "row",
      fields: [
        { name: "transactionType", type: "select", required: true, options: transactionTypeOptions, admin: { width: "50%" } },
        { name: "propertyType", type: "select", required: true, options: propertyTypeOptions, admin: { width: "50%" } },
      ],
    },
    {
      type: "collapsible",
      label: "موقعیت (سراسر ایران)",
      fields: [
        {
          type: "row",
          fields: [
            { name: "province", type: "text", admin: { width: "33%" } },
            { name: "city", type: "text", index: true, admin: { width: "33%" } },
            { name: "neighborhood", type: "text", index: true, admin: { width: "33%" } },
          ],
        },
        { name: "address", type: "text", admin: { description: "آدرس دقیق — محرمانه؛ روی سایت نمایش داده نمی‌شود." } },
      ],
    },
    {
      type: "collapsible",
      label: "مشخصات",
      fields: [
        {
          type: "row",
          fields: [
            { name: "area", type: "number", label: "متراژ (متر)", admin: { width: "25%" } },
            { name: "bedrooms", type: "number", label: "اتاق خواب", admin: { width: "25%" } },
            { name: "bathrooms", type: "number", label: "سرویس", admin: { width: "25%" } },
            { name: "floor", type: "number", label: "طبقه", admin: { width: "25%" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "totalFloors", type: "number", label: "تعداد طبقات", admin: { width: "33%" } },
            { name: "yearBuilt", type: "number", label: "سال ساخت", admin: { width: "33%" } },
            { name: "deedType", type: "select", label: "نوع سند", options: deedTypeOptions, admin: { width: "33%" } },
          ],
        },
        { name: "amenities", type: "select", hasMany: true, options: amenityOptions, label: "امکانات" },
      ],
    },
    {
      type: "collapsible",
      label: "قیمت",
      fields: [
        {
          type: "row",
          fields: [
            { name: "currency", type: "select", defaultValue: "toman", options: currencyOptions, admin: { width: "25%" } },
            { name: "price", type: "number", label: "قیمت کل / فروش", admin: { width: "25%" } },
            { name: "deposit", type: "number", label: "ودیعه (رهن)", admin: { width: "25%" } },
            { name: "rent", type: "number", label: "اجارهٔ ماهانه", admin: { width: "25%" } },
          ],
        },
      ],
    },
    { name: "description", type: "richText", localized: true },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      admin: { position: "sidebar", description: "فقط مدیر می‌تواند منتشر کند." },
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: "پیش‌نویس", value: "draft" },
        { label: "در انتظار تأیید", value: "pending" },
        { label: "منتشرشده", value: "published" },
        { label: "بایگانی", value: "archived" },
      ],
    },
    { name: "featured", type: "checkbox", label: "ویژه", admin: { position: "sidebar" } },
    { name: "agent", type: "relationship", relationTo: "users", admin: { position: "sidebar" } },
    { name: "code", type: "text", label: "کد ملک", admin: { position: "sidebar" } },
  ],
};

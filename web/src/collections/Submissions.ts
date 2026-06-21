import type { CollectionConfig } from "payload";
import { anyone, isStaff, isAdmin } from "./access";
import { transactionTypeOptions, propertyTypeOptions } from "./options";

// Public "سپردن ملک" submissions — anyone can create; staff review & approve.
export const Submissions: CollectionConfig = {
  slug: "submissions",
  admin: {
    useAsTitle: "ownerName",
    defaultColumns: ["ownerName", "transactionType", "city", "status", "createdAt"],
    group: "ورودی‌ها",
    listSearchableFields: ["ownerName", "ownerPhone", "city"],
  },
  access: { read: isStaff, create: anyone, update: isStaff, delete: isAdmin },
  fields: [
    {
      type: "row",
      fields: [
        { name: "transactionType", type: "select", options: transactionTypeOptions, admin: { width: "50%" } },
        { name: "propertyType", type: "select", options: propertyTypeOptions, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "province", type: "text", admin: { width: "33%" } },
        { name: "city", type: "text", admin: { width: "33%" } },
        { name: "neighborhood", type: "text", admin: { width: "33%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "area", type: "number", label: "متراژ", admin: { width: "33%" } },
        { name: "bedrooms", type: "number", label: "خواب", admin: { width: "33%" } },
        { name: "price", type: "number", label: "قیمت پیشنهادی", admin: { width: "33%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "ownerName", type: "text", label: "نام مالک", admin: { width: "50%" } },
        { name: "ownerPhone", type: "text", label: "تلفن", admin: { width: "50%" } },
      ],
    },
    { name: "notes", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "جدید", value: "new" },
        { label: "بررسی‌شده", value: "reviewed" },
        { label: "تأییدشده", value: "approved" },
        { label: "ردشده", value: "rejected" },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";
import { anyone, isStaff, isAdmin } from "./access";

// Enquiries / contact requests — anyone can create; staff manage.
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "listing", "status", "createdAt"],
    group: "ورودی‌ها",
    listSearchableFields: ["name", "phone"],
  },
  access: { read: isStaff, create: anyone, update: isStaff, delete: isAdmin },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "message", type: "textarea" },
    { name: "listing", type: "relationship", relationTo: "listings" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "جدید", value: "new" },
        { label: "تماس گرفته‌شد", value: "contacted" },
        { label: "بازدید", value: "viewing" },
        { label: "بسته‌شده", value: "closed" },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";
import { isAdmin, isStaff } from "./access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "name", defaultColumns: ["name", "email", "role"] },
  access: {
    read: isStaff,
    create: isAdmin,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "agent",
      access: { update: ({ req }) => (req.user as { role?: string } | null)?.role === "admin" },
      options: [
        { label: "مدیر (Admin)", value: "admin" },
        { label: "مشاور (Agent)", value: "agent" },
      ],
    },
    { name: "phone", type: "text" },
  ],
};

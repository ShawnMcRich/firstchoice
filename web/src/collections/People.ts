import type { CollectionConfig } from "payload";
import { isStaff, isAdmin } from "./access";
import { peopleRoleOptions } from "./options";

// Admin-side CRM: browse & search customers, tenants, owners, landlords.
export const People: CollectionConfig = {
  slug: "people",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "phone", "email"],
    group: "CRM",
    listSearchableFields: ["name", "phone", "email"],
    description: "مشتریان، مستأجران، مالکان و موجران",
  },
  access: { read: isStaff, create: isStaff, update: isStaff, delete: isAdmin },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "select", required: true, options: peopleRoleOptions },
    { name: "phone", type: "text", index: true },
    { name: "email", type: "email" },
    { name: "notes", type: "textarea" },
    { name: "relatedListings", type: "relationship", relationTo: "listings", hasMany: true },
  ],
};

import type { CollectionConfig } from "payload";
import { anyone, isStaff } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumb", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800 },
      { name: "hero", width: 1600 },
    ],
  },
  fields: [{ name: "alt", type: "text", localized: true }],
};

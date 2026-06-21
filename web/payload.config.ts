import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Listings } from "./src/collections/Listings";
import { People } from "./src/collections/People";
import { Submissions } from "./src/collections/Submissions";
import { Leads } from "./src/collections/Leads";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseUri = process.env.DATABASE_URI || "";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Listings, People, Submissions, Leads, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  localization: {
    locales: [
      { label: "فارسی", code: "fa" },
      { label: "English", code: "en" },
      { label: "العربية", code: "ar" },
    ],
    defaultLocale: "fa",
  },
  // Local dev falls back to a SQLite file; production uses Postgres via DATABASE_URI.
  db: databaseUri.startsWith("postgres")
    ? postgresAdapter({ push: true, pool: { connectionString: databaseUri } })
    : sqliteAdapter({ client: { url: databaseUri || "file:./firstchoice.db" } }),
  sharp,
});

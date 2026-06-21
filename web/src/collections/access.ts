import type { Access, FieldAccess } from "payload";

const roleOf = (user: unknown): string | undefined =>
  (user as { role?: string } | null | undefined)?.role;

export const anyone: Access = () => true;
export const isStaff: Access = ({ req }) => Boolean(req.user);
export const isAdmin: Access = ({ req }) => roleOf(req.user) === "admin";

// Public can read published listings; staff can read everything.
export const readListings: Access = ({ req }) =>
  req.user ? true : { status: { equals: "published" } };

// Field-level: only admins may set/change a field (used for the publish status).
export const isAdminField: FieldAccess = ({ req }) => roleOf(req.user) === "admin";

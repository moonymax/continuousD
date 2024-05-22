import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const client = createClient({
  url: "file:./local.db",
  //authToken: "DATABASE_AUTH_TOKEN",
});

export const db = drizzle(client);

export const users = sqliteTable("users", {
  id: text("id"),
  textModifiers: text("text_modifiers")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  intModifiers: integer("int_modifiers", { mode: "boolean" })
    .notNull()
    .default(false),
});

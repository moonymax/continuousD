import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const client = createClient({
  url: "file:./local.db",
  //authToken: "DATABASE_AUTH_TOKEN",
});
/*
  -------- SCHEMA ---------
  user:
    username: string
    email: string
    password: string
    accessToken: string
  
  deployment:
    user: id
    repoName: string
    branchName: string
    mostRecentHash: string

*/

/*
export const db = drizzle(client);

export const users = sqliteTable("users", {
  id: integer("id"),
  username: text("username")
  createdAt: text("createdAt"),
});
*/

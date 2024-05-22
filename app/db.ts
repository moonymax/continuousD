import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:replica.db",
  syncUrl: "libsql://...",
  authToken: "...",
});

const result = await client.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});

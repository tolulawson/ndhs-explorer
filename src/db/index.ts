import { SQL } from "bun";

export const db = new SQL({
  adapter: "sqlite",
  filename: process.env.DATABASE_URL!,
});

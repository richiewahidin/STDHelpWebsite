import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { mainRouter } from "./api/lib/routers/lib/main.js";

const app = new Hono().use("*", cors()).route("/", mainRouter);

serve({
  fetch: app.fetch,
  port: 3000,
}).on("listening", () => {
  console.log(">>> API running on: http://localhost:3000");
});

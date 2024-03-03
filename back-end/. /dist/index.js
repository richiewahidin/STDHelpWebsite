import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { mainRouter } from "./api/lib/routers/lib/main.js";
const app = new Hono().use("*").route("/", mainRouter);
serve({
    fetch: app.fetch,
    port: 3000,
}).on("listening", () => {
    console.log(">>> API running on: http://localhost:3000");
});

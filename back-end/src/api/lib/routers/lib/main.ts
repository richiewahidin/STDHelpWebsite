import { Hono } from "hono";
import { prevalenceRouter } from "./prevalence/router.js";

export const mainRouter = new Hono()
  .basePath("/api/v1")
    .route("/prevalence", prevalenceRouter);

export type AppType = typeof mainRouter;

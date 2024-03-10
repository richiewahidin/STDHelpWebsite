import { Hono } from "hono";
import { prevalenceRouter } from "./prevalence/router.js";
import { countyRouter } from "./county/router.js";
import { treatmentCenterRouter } from "./treatment-center/router.js";
import { testRouter } from "./router.js";

export const mainRouter = new Hono()
  .route("/", testRouter)
  .route("/prevalence", prevalenceRouter)
  .route("/county", countyRouter)
  .route("/treatmentcenter", treatmentCenterRouter);

export type AppType = typeof mainRouter;

import { Hono } from "hono";
import { prevalenceRouter } from "./prevalence/router.js";
import { countyRouter } from "./county/router.js";
import { treatmentCenterRouter } from "./treatment-center/router.js";
export const mainRouter = new Hono()
    .basePath("/api/v1")
    .route("/prevalence", prevalenceRouter)
    .route("/county", countyRouter)
    .route("/treatment-center", treatmentCenterRouter);

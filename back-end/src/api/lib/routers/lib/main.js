"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var hono_1 = require("hono");
var router_js_1 = require("./prevalence/router.js");
var router_js_2 = require("./county/router.js");
var router_js_3 = require("./treatment-center/router.js");
exports.mainRouter = new hono_1.Hono()
    .basePath("/api/v1")
    .route("/prevalence", router_js_1.prevalenceRouter)
    .route("/county", router_js_2.countyRouter)
    .route("/treatment-center", router_js_3.treatmentCenterRouter);

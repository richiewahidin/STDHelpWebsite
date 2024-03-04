"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var hono_1 = require("hono");
var main_js_1 = require("./api/lib/routers/lib/main.js");
var app = new hono_1.Hono().use("*").route("/", main_js_1.mainRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3000,
}).on("listening", function () {
    console.log(">>> API running on: http://localhost:3000");
});

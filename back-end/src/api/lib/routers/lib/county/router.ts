import { Hono } from "hono";
import pool from "../../../../../db/index.js";

export const countyRouter = new Hono()
  .get("/", async (c) => {
    try {
      const res = await pool.query("SELECT * FROM county");
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  })
  .get("/:id", async (c) => {
    try {
      const reqId = c.req.param("id");
      const res = await pool.query("SELECT * FROM county WHERE id = $1", [
        reqId,
      ]);
      return c.json(res);
    } catch (err) {
      console.log(err);
    }
  })
  .post("/", async (c) => {
    try {
      const {
        name,
        population,
        ccases,
        gcases,
        scases,
        escases,
        tscases,
        udcases,
      } = await c.req.json();
      const queryText =
        "INSERT INTO county(name, population, ccases, gcases, scases, escases, tscases, udcases) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
      const queryValues = [
        name,
        population,
        ccases,
        gcases,
        scases,
        escases,
        tscases,
        udcases,
      ];
      const res = await pool.query(queryText, queryValues);
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  });

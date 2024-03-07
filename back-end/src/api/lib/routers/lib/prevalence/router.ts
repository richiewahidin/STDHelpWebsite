import { Hono } from "hono";
import pool from "../../../../../db/index.js";

export const prevalenceRouter = new Hono()
  .get("/", async (c) => {
    try {
      const res = await pool.query("SELECT * FROM prevalence");
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  })
  .post("/", async (c) => {
    try {
      const { year, disease, sex, cases, rate, percent_tested } =
        await c.req.json();
      const queryText =
        "INSERT INTO prevalence(year, disease, sex, cases, rate, percent_tested) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const queryValues = [year, disease, sex, cases, rate, percent_tested];
      const res = await pool.query(queryText, queryValues);
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  });

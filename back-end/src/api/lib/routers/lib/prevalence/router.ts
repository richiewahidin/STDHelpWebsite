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
  .get("/:id", async (c) => {
    try {
      const reqId = c.req.param("id");
      const res = await pool.query("SELECT * FROM prevalence WHERE id = $1", [
        reqId,
      ]);
      return c.json(res);
    } catch (err) {
      console.log(err);
    }
  })
  .post("/", async (c) => {
    try {
      const { year, gender, cases, casesper100k } = await c.req.json();
      const queryText =
        "INSERT INTO prevalence(year, gender, cases, casesper100k) VALUES($1, $2, $3, $4) RETURNING *";
      const queryValues = [year, gender, cases, casesper100k];
      const res = await pool.query(queryText, queryValues);
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  });

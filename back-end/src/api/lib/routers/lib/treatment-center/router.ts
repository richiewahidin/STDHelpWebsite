import { Hono } from "hono";
import pool from "../../../../../db/index.js";

export const treatmentCenterRouter = new Hono()
  .get("/", async (c) => {
    try {
      const client = await pool.connect();
      const res = await client.query("SELECT * FROM prevalence");
      client.release();
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  })
  .post("/", async (c) => {});

import { Hono } from "hono";
import pool from "../../../../../db/index.js";

export const prevalenceRouter = new Hono()
  .get("/", async (c) => {
    try {
      const result = await pool.query("SELECT * FROM prevalence");
      return c.json(result.rows);
    } catch (err) {
      console.log(err);
      return c.json("Error");
    }
  })
  .post("/", async (c) => {
    return c.json("Hi!");
  });

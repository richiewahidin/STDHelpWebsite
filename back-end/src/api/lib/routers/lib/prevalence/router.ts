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
      const {
        countyId,
        year,
        sex,
<<<<<<< HEAD
=======
        population,
>>>>>>> bc30eb5be2cdebb61d5bf589a39c5d6d10de67ce
        c_cases,
        c_rate,
        s_cases,
        s_rate,
        g_cases,
        g_rate,
        countyImage,
      } = await c.req.json();
<<<<<<< HEAD
      const queryText =
        "INSERT INTO prevalence(countyid, year, sex, c_cases, c_rate, s_cases, s_rate, g_cases, g_rate, countyimage) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
=======

      const queryText =
        "INSERT INTO prevalence(countyId, year, sex, population, c_cases, c_rate, s_cases, s_rate, g_cases, g_rate, countyImage) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
>>>>>>> bc30eb5be2cdebb61d5bf589a39c5d6d10de67ce
      const queryValues = [
        countyId,
        year,
        sex,
<<<<<<< HEAD
=======
        population,
>>>>>>> bc30eb5be2cdebb61d5bf589a39c5d6d10de67ce
        c_cases,
        c_rate,
        s_cases,
        s_rate,
        g_cases,
        g_rate,
        countyImage,
      ];
      const res = await pool.query(queryText, queryValues);
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  });

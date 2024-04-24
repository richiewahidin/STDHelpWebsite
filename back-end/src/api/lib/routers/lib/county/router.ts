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
        id,
        mapurl,
        flagurl,
        countyseat,
        imgurl,
        name,
        map,
        flag,
        population,
        img,
        gcases,
        ccases,
        scases,
        escases,
        tscases,
        udcases,
      } = await c.req.json();
      const queryText =
<<<<<<< HEAD
        "INSERT INTO county(id, name, mapurl, flagurl, population, countyseat, imgurl, gcases, ccases, scases, escases, tscases, udcases) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
=======
        "INSERT INTO county(name, map, flag, population, img, gcases, ccases, scases, escases, tscases, udcases) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
>>>>>>> bc30eb5be2cdebb61d5bf589a39c5d6d10de67ce
      const queryValues = [
        id,
        name,
<<<<<<< HEAD
        mapurl,
        flagurl,
        population,
        countyseat,
        imgurl,
=======
        map,
        flag,
        population,
        img,
        ccases,
>>>>>>> bc30eb5be2cdebb61d5bf589a39c5d6d10de67ce
        gcases,
        ccases,
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

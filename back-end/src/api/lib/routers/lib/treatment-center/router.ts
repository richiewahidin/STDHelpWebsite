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
  .post("/", async (c) => {
    try {
      const { name, address, countyId, distance, phoneNumber, website } =
        await c.req.json();
      const queryText =
        "INSERT INTO prevalence(name, address, countyId, distance, phoneNumber, website) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const queryValues = [
        name,
        address,
        countyId,
        distance,
        phoneNumber,
        website,
      ];
      const res = await pool.query(queryText, queryValues);
      return c.json(res);
    } catch (err) {
      console.log(err);
      return c.json(err);
    }
  });

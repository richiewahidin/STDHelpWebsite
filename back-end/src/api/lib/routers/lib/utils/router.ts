import { Hono } from "hono";
import pool from "../../../../../db/index.js";

export const utilsRouter = new Hono().post("/search", async (c) => {
  try {
    const { searchTerm } = await c.req.json();
    const countySearch = `SELECT 'county' AS source_table, * \
      FROM county \
      WHERE to_tsvector(name::text || ' ' || population::text) @@ plainto_tsquery($1)`;
    const prevalenceSearch =
      "SELECT 'prevalence' AS source_table, * \
      FROM prevalence \
      WHERE to_tsvector(year::text || ' ' || sex::text || ' ' || population::text) @@ plainto_tsquery($1)";
    const treatmentcenterSearch =
      "SELECT 'treatmentcenter' AS source_table, * \
      FROM treatmentcenter \
      WHERE to_tsvector(name::text || ' ' || address::text || ' ' || phoneNumber::text || ' ' || website::text) @@ plainto_tsquery($1)";

    const countyRes = await pool.query(countySearch, [searchTerm]);
    const prevalenceRes = await pool.query(prevalenceSearch, [searchTerm]);
    const treatmentcenterRes = await pool.query(treatmentcenterSearch, [
      searchTerm,
    ]);

    return c.json({ countyRes, prevalenceRes, treatmentcenterRes });
  } catch (err) {
    console.error(err);
    return c.json(err);
  }
});

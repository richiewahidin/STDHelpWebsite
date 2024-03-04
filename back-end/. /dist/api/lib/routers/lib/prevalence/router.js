import { Hono } from "hono";
import pool from "../../../../../db/index.js";
export const prevalenceRouter = new Hono()
    .get("/", async (c) => {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT * FROM prevalence");
        client.release();
        return c.json(res);
    }
    catch (err) {
        console.log(err);
        return c.json(err);
    }
})
    .post("/", async (c) => {
    try {
        const { year, gender, cases, casesper100k } = await c.req.json();
        const queryText = "INSERT INTO prevalence(year, gender, cases, casesper100k) VALUES($1, $2, $3, $4) RETURNING *";
        const queryValues = [year, gender, cases, casesper100k];
        const client = await pool.connect();
        const res = await client.query(queryText, queryValues);
        client.release();
        return c.json(res);
    }
    catch (err) {
        console.log(err);
        return c.json(err);
    }
});

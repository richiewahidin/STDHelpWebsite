import { Hono } from "hono";
import { testClient } from "hono/testing";
import mainHono from "../src/index.js";

// unit tests

const testOne = async () => {
  const app = mainHono;
  const res = await testClient(app).api.v1.prevalence.$get();

  if (res.json() !== null) {
    return true;
  }
};

testOne();

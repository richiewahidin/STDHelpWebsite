import { Hono } from "hono";
import { testClient } from "hono/testing";
import { mainRouter } from "../src/api/lib/routers/lib/main.js";

const app = new Hono().use("*").route("/", mainRouter);

// unit tests

// get prevalence
const testOne = async () => {
  const res = await testClient(app).api.v1.prevalence.$get();

  return res.status == 200;
};

// get treatmentcenter
const testTwo = async () => {
  const res = await testClient(app).api.v1.treatmentcenter.$get();

  return res.status == 200;
};

// get county
const testThree = async () => {
  const res = await testClient(app).api.v1.county.$get();

  return res.status == 200;
};

// post county
const testFour = async () => {
  try {
    const input = {
      name: "testCounty",
      population: 100,
      ccases: "100",
      gcases: "100",
      scases: "100",
      escases: "100",
      tscases: "100",
      udcases: "100",
    };
    var res = await testClient(app).api.v1.county.$post({ ...input });
    return res.status == 200;
  } catch {
    return false;
  }
};

// post prevalence
const testFive = async () => {
  try {
    const input = {
      year: 1999,
      disease: "Chlamydia",
      sex: "Male",
      cases: 20000,
      population: null,
      rate: 161.1,
      percent_tested: "20%",
    };
    var res = await testClient(app).api.v1.prevalence.$post({ ...input });
    return res.status == 200;
  } catch {
    return false;
  }
};

// post treatmentcenter
const testSix = async () => {
  try {
    const input = {
      name: "test",
      address: "test address",
      countyId: 0,
      distance: 0.21,
      phoneNumber: "1613216326",
      website: "testwebsite.com",
    };
    var res = await testClient(app).api.v1.treatmentcenter.$post({ ...input });
    return res.status == 200;
  } catch {
    return false;
  }
};

const testOneRes = testOne();
const testTwoRes = testTwo();
const testThreeRes = testThree();
const testFourRes = testFour();
const testFiveRes = testFive();
const testSixRes = testSix();

const results = [
  testOneRes,
  testTwoRes,
  testThreeRes,
  testFourRes,
  testFiveRes,
  testSixRes,
];

results.map((value, index) => {
  value.then((res) => {
    if (res) {
      console.log("Test case number " + (index + 1) + " passed");
    } else {
      console.log("Test case number " + (index + 1) + " failed");
    }
  });
});

import {
  correctInput,
  wrongClassAndModality,
  wrongClass,
  invalidDocumentType,
  wrongModality,
  wrongArrayLength,
  lowConsumption,
  parcialPeriod,
  invalidArrayTypeOfItems,
} from "./mocks";

import app from "../app";
import request from "supertest";

// describe("testing wrong input values", () => {
//   test("should be able to get average and sum", () => {});
// });

describe("testing correct input values", () => {
  test("should be able to get the correct output", async () => {
    const response = await request(app).post("/eligible").send(correctInput);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body).toHaveProperty("economiaAnualDeCO2");
    expect(response.body.elegivel).toEqual(true);
    expect(typeof response.body.economiaAnualDeCO2).toBe("number");
    expect(response.body.economiaAnualDeCO2).toEqual(5553.24);
    expect(response.status).toBe(200);
  });
});

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

describe("POST/eligible - testing wrong input values", () => {
  test("should return an error array with 2 args (Wrong class and modality)", async () => {
    const response = await request(app)
      .post("/eligible")
      .send(wrongClassAndModality);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.status).toBe(400);
  });

  test("should return an error array with 1 arg (Wrong class)", async () => {
    const response = await request(app).post("/eligible").send(wrongClass);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Classe de consumo não aceita"
    );

    expect(response.status).toBe(400);
  });

  test("should return an error array with 1 arg (Invalid Document Format)", async () => {
    const response = await request(app)
      .post("/eligible")
      .send(invalidDocumentType);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Documento inválido"
    );
    expect(response.status).toBe(400);
  });

  test("should return an error array with 1 arg (Wrong modality)", async () => {
    const response = await request(app).post("/eligible").send(wrongModality);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Modalidade tarifária não aceita"
    );
    expect(response.status).toBe(400);
  });

  test("should return an error array with 1 arg (Wrong Array Length Format)", async () => {
    const response = await request(app)
      .post("/eligible")
      .send(wrongArrayLength);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Histórico de consumo deve conter entre 3 a 12 meses"
    );
    expect(response.status).toBe(400);
  });

  test("should return an error array with 1 arg (invalid Array Type Items)", async () => {
    const response = await request(app)
      .post("/eligible")
      .send(invalidArrayTypeOfItems);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Formato inválido de histórico de consumo"
    );
    expect(response.status).toBe(400);
  });
});

describe("POST/eligible - testing correct input values", () => {
  test("should be able to get the correct output (full period)", async () => {
    const response = await request(app).post("/eligible").send(correctInput);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body).toHaveProperty("economiaAnualDeCO2");
    expect(response.body.elegivel).toEqual(true);
    expect(typeof response.body.economiaAnualDeCO2).toBe("number");
    expect(response.body.economiaAnualDeCO2).toEqual(5553.24);
    expect(response.status).toBe(200);
  });

  test("should be able to get the correct parcial output properties (parcial Period )", async () => {
    const response = await request(app).post("/eligible").send(parcialPeriod);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(true);
    expect(response.body).toHaveProperty("quantidadeMesesAvaliados");
    expect(response.body).toHaveProperty("economiaParcialDeCO2");
    expect(response.status).toBe(200);
  });

  test("should return an error array with 1 arg (low consumption average)", async () => {
    const response = await request(app).post("/eligible").send(lowConsumption);

    expect(response.body).toHaveProperty("elegivel");
    expect(response.body.elegivel).toEqual(false);
    expect(response.body).toHaveProperty("razoesInelegibilidade");
    expect(response.body.razoesInelegibilidade).toBeInstanceOf(Array);
    expect(response.body.razoesInelegibilidade[0]).toEqual(
      "Consumo muito baixo para tipo de conexão"
    );
    expect(response.status).toBe(200);
  });
});

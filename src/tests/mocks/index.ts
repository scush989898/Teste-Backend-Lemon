import { IClientRequest } from "../../interfaces";

const correctInput: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
  ],
};

const invalidArrayTypeOfItems = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    "3878", 9760, 5976, 2797, 2481, "5731", 7538, 4392, 7859, 4160, 6941, 4597,
  ],
};

const lowConsumption: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [50, 30, 90],
};

const parcialPeriod: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [9999, 9999, 9999, 9999, 9999, 9999],
};

const wrongClassAndModality: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "rural",
  modalidadeTarifaria: "verde",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
  ],
};

const wrongClass: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "Poder Público",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
  ],
};

const invalidDocumentType: IClientRequest = {
  numeroDoDocumento: "140417377068",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
  ],
};

const wrongModality: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "Azul",
  historicoDeConsumo: [
    3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
  ],
};

const wrongArrayLength: IClientRequest = {
  numeroDoDocumento: "14041737706",
  tipoDeConexao: "bifasico",
  classeDeConsumo: "comercial",
  modalidadeTarifaria: "convencional",
  historicoDeConsumo: [3878, 9760],
};

export {
  correctInput,
  wrongClassAndModality,
  wrongClass,
  invalidDocumentType,
  wrongModality,
  wrongArrayLength,
  lowConsumption,
  parcialPeriod,
  invalidArrayTypeOfItems
};

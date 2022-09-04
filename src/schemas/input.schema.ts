import { IClientRequest } from "../interfaces/";
import * as yup from "yup";
import { SchemaOf } from "yup";

const ClientEligibleRequest: SchemaOf<IClientRequest> = yup.object().shape({
  numeroDoDocumento: yup
    .string()
    .required()
    .matches(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      "Documento inválido"
    ),
  tipoDeConexao: yup
    .string()
    .required()
    .oneOf(["monofasico", "bifasico", "trifasico"], "Tipo de conexão inválida"),

  classeDeConsumo: yup
    .string()
    .required()
    .oneOf(
      ["comercial", "residencial","industrial"],
      "Classe de consumo não aceita"
    ),
  modalidadeTarifaria: yup
    .string()
    .required()
    .oneOf(["branca", "convencional"], "Modalidade tarifária não aceita"),
  historicoDeConsumo: yup.array().required().min(3).max(12),
});

export { ClientEligibleRequest };

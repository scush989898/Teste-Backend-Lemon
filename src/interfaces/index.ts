export interface IClientRequest {
  numeroDoDocumento: string;
  tipoDeConexao: string;
  classeDeConsumo: string;
  modalidadeTarifaria: string;
  historicoDeConsumo: number[];
}

export interface IClientEligibleResponse {
  elegivel: boolean;
  economiaAnualDeCO2: number;
}

export interface IClientNotEligibleResponse {
  elegivel: boolean;
  razoesInelegibilidade: string[];
}


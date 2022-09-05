import { IClientRequest } from "../interfaces";
import { EligibilityError } from "../errors/eligibility.error";

const eligibilityTerms = {
  monofasico: 400,
  bifasico: 500,
  trifasico: 750,
};

const amountCarbonKG = 84;

const clientEligibleService = (
  data: IClientRequest
): number => {
  const [average, sum] = getAvgConsumption(data.historicoDeConsumo);
  const connectionAvg = getConnectionAvg(data.tipoDeConexao);

  if (average <= connectionAvg!)
    throw new EligibilityError("Consumo muito baixo para tipo de conexão");

  return getAvgSavings(sum);
};

const getAvgConsumption = (arr: number[]): number[] => {
  const sum = arr.reduce((a, b) => a + b, 0);
  const average = sum / arr.length;
  return [average, sum];
};

const getConnectionAvg = (connectionType: string) => {
  for (let [key, value] of Object.entries(eligibilityTerms)) {
    if (key == connectionType) {
      return value;
    }
  }
};

const getAvgSavings = (sum: number): number => {
  return (sum / 1000) * amountCarbonKG;
};

export {
  clientEligibleService,
  getAvgConsumption,
  getConnectionAvg,
  getAvgSavings,
  eligibilityTerms,
  amountCarbonKG,
};

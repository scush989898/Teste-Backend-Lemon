import { IClientRequest } from "../interfaces";
import { EligibilityError } from "../errors/eligibility.error";

const eligibilityTerms = {
  monofasico: 400 / 12,
  bifasico: 500 / 12,
  trifasico: 750 / 12,
};

const amountCarbonKG = 84;

const clientEligibleService = (
  data: IClientRequest,
  period: number
): number => {
  const [average, sum] = getAvgConsumption(data.historicoDeConsumo);
  const connectionAvg = getConnectionAvg(data.tipoDeConexao, period);

  if (average <= connectionAvg!) {
    throw new EligibilityError(
      "A média de consumo não atingiu o valor mínimo estipulado."
    );
  }
  return getAvgSavings(sum);
};

const getAvgConsumption = (arr: number[]): number[] => {
  const sum = arr.reduce((a, b) => a + b, 0);
  const average = sum / arr.length;
  return [average, sum];
};

const getConnectionAvg = (connectionType: string, period: number) => {
  for (let [key, value] of Object.entries(eligibilityTerms)) {
    if (key == connectionType) {
      return value * period;
    }
  }
};

const getAvgSavings = (sum: number): number => {
  return (sum / 1000) * amountCarbonKG;
};

export default clientEligibleService;

import {
  IClientEligibleResponse,
  IClientNotEligibleResponse,
  IClientRequest,
} from "../interfaces";
import { EligibilityError } from "../errors/eligibility.error";

const eligibilityTerms = {
  monofasico: 400 / 12,
  bifasico: 500 / 12,
  trifasico: 750 / 12,
};

const amountCarbonKG = 84 / 12;

const clientEligibleService = (
  data: IClientRequest
): IClientEligibleResponse | IClientNotEligibleResponse => {
  const period = data.historicoDeConsumo.length;
  const [average, sum] = getAvgConsumption(data.historicoDeConsumo);
  const connectionAvg = getConnectionAvg(data.tipoDeConexao, period);

  if (average <= connectionAvg! ) {
    throw new EligibilityError(
      "A média de consumo não atingiu o valor mínimo estipulado."
    );
  }
  const savings = getAvgSavings(period, sum);

  const res: IClientEligibleResponse = {
    elegivel: true,
    economiaAnualDeCO2: savings,
  };

  return res;
};

const getAvgConsumption = (arr: number[]): number[] => {
  const sum = arr.reduce((a, b) => a + b);
  const avg = sum / arr.length;
  return [avg, sum];
};

const getConnectionAvg = (connectionType: string, period: number) => {
  for (let [key, value] of Object.entries(eligibilityTerms)) {
    if (key == connectionType) {
      return value * period;
    }
  }
};

const getAvgSavings = (period: number, sum: number): number => {
  const amountInterval = period * amountCarbonKG;
  return (sum / 1000) * amountInterval;
};

export default clientEligibleService;

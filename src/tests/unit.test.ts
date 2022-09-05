import {
  getAvgConsumption,
  getConnectionAvg,
  getAvgSavings,
} from "../services/clientEligible.service";

const testArray = [
  3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
];
const period = testArray.length;
const sum = testArray.reduce((a, b) => a + b);
const average = sum / period;
const savings = (sum / 1000) * 84;

describe("testing functions related to consumption calculation", () => {
  test("should be able to get average and sum", () => {
    const res = getAvgConsumption(testArray);

    expect(res).toBeInstanceOf(Array);
    expect(res).toHaveLength(2);
    expect(res[0]).toEqual(average);
    expect(res[1]).toEqual(sum);
  });

  test("should return the value of a specific connection type", () => {
    const monofasico = getConnectionAvg("monofasico");
    expect(monofasico).toBe(400);

    const bisafico = getConnectionAvg("bifasico");
    expect(bisafico).toBe(500);

    const trifasico = getConnectionAvg("trifasico");
    expect(trifasico).toBe(750);

  });

  test("should return the correct value of savings", () => {
    const res = getAvgSavings(sum);
    expect(res).toBe(savings);
  });
});


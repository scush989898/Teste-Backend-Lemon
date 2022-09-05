import { Request, Response } from "express";
import { IClientRequest } from "../interfaces";
import { clientEligibleService } from "../services/clientEligible.service";
import { EligibilityError } from "../errors/eligibility.error";

const clientEligibleController = (req: Request, res: Response) => {
  const months = req.body.historicoDeConsumo.length;
  const data: IClientRequest = req.body;

  const isArrayValid = data.historicoDeConsumo.filter(
    (el) => typeof el != "number" || el < 0 || el > 9999
  );
  if (isArrayValid.length != 0)
    throw new EligibilityError("Formato inválido de histórico de consumo", 400);

  const savings = +clientEligibleService(req.body, months).toFixed(2);

  if (months < 12) {
    return res.json({
      elegivel: true,
      quantidadeMesesAvaliados: months,
      economiaParcialDeCO2: savings,
    });
  }

  return res.json({ elegivel: true, economiaAnualDeCO2: savings });
};

export default clientEligibleController;

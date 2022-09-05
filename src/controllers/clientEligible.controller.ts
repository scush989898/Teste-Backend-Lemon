import { Request, Response } from "express";
import {clientEligibleService} from "../services/clientEligible.service";

const clientEligibleController = (req: Request, res: Response) => {
  const months = req.body.historicoDeConsumo.length;
  const savings = +clientEligibleService(req.body, months).toFixed(2);

  if (months < 12) {
    return res.json({
      elegivel: true,
      quantidadeMesesAvaliados: months,
      economiaParcialDeCO2: savings,
    });
  }

  return res.json({
    elegivel: true,
    economiaAnualDeCO2: savings,
  });
};

export default clientEligibleController;

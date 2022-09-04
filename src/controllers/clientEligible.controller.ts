import { Request, Response } from "express";
import clientEligibleService from "../services/clientEligible.service";

const clientEligibleController = (req: Request, res: Response) => {
  // clientEligibleService

  return res.json({
    elegivel: true,
    economiaAnualDeCO2: 5553.24,
  });
};

export default clientEligibleController;

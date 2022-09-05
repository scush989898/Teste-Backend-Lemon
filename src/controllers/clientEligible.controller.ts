import { Request, Response } from "express";
import clientEligibleService from "../services/clientEligible.service";

const clientEligibleController = (req: Request, res: Response) => {
  const response = clientEligibleService(req.body);

  return res.json(response);
};

export default clientEligibleController;

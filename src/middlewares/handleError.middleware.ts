import { Request, Response, NextFunction } from "express";
import { EligibilityError } from "../errors/eligibility.error";

export const handleErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof EligibilityError) {
    return res.status(error.statusCode).json({
      elegivel: false,
      razoesInelegibilidade: [error.message],
    });
  }
  return res.status(500).json({
    elegivel: false,
    razoesInelegibilidade: ["Internal Error"],
  });
};

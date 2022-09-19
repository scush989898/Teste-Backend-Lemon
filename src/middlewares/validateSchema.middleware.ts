import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const validationMiddleware =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = req.body;

      const validated = await schema.validate(client, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validated;
      next();
    } catch (error: any) {
      return res.status(400).json({
        elegivel: false,
        razoesInelegibilidade: [...error.errors],
      });
    }
  };

export { validationMiddleware };

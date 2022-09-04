// import "express-async-errors";
import express from "express";
import "dotenv/config";
import clientEligibleController from "./controllers/clientEligible.controller";
import { validationMiddleware } from "./middlewares/validateSchema.middleware";
import { ClientEligibleRequest } from "./schemas/input.schema";

const app = express();
app.use(express.json());

app.post(
  "/eligible",
  validationMiddleware(ClientEligibleRequest),
  clientEligibleController
);
// app.use(handleErrorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
export default app;

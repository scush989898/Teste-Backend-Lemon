// import "express-async-errors";
import express from "express";
import "dotenv/config";
import clientEligibleController from "./controllers/clientEligible.controller";

const app = express();
app.use(express.json());

app.post("/eligible", clientEligibleController);
// app.use(handleErrorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
export default app;

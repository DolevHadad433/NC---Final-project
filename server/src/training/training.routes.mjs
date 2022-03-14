import { Router } from "express";

import { getAllTraining } from "./training.data.mjs";

export const TrainingRouters = Router();

TrainingRouters.get("/", async (req, res) => {
  res.send(await getAllTraining());
});

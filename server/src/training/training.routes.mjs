import { Router } from "express";

import {
  getAllTraining,
  getTrainingById,
  createNewTraining,
  editTraining,
  deleteTraining,
} from "./training.data.mjs";

export const TrainingRouters = Router();

// READ - Get all training
TrainingRouters.get("/", async (req, res) => {
  res.send(await getAllTraining());
});

// CREATE - Create a new training
TrainingRouters.post("/", async (req, res) => {
  res.send(await createNewTraining(req.body));
});

// READ - Get training by ID
TrainingRouters.get("/:id", async (req, res) => {
  res.send(await getTrainingById(req.params.id));
});

// UPDATE - Update training by ID
TrainingRouters.put("/:id", async (req, res) => {
  res.send(await editTraining(req.params.id, req.body));
});

// DELETE - Delete training by ID
TrainingRouters.delete("/:id", async (req, res) => {
  await deleteTraining(req.params.id);
  res.send("ok");
});

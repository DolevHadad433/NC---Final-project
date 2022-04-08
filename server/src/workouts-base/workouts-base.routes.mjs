import { Router } from "express";

import {
  getAllWorkoutsBase,
  getWorkoutBaseById,
  createNewWorkoutBase,
  editWorkoutBase,
  deleteWorkoutBase,
} from "./workouts-base.data.mjs";

export const WorkoutsBaseRouters = Router();

// READ - Get all workouts
WorkoutsBaseRouters.get("/", async (req, res) => {
  res.send(await getAllWorkoutsBase());
});

// CREATE - Create a new workouts
WorkoutsBaseRouters.post("/", async (req, res) => {
  res.send(await createNewWorkoutBase(req.body));
});

// READ - Get workouts by ID
WorkoutsBaseRouters.get("/:id", async (req, res) => {
  res.send(await getWorkoutBaseById(req.params.id));
});

// UPDATE - Update workouts by ID
WorkoutsBaseRouters.put("/:id", async (req, res) => {
  res.send(await editWorkoutBase(req.params.id, req.body));
});

// DELETE - Delete workouts by ID
WorkoutsBaseRouters.delete("/:id", async (req, res) => {
  await deleteWorkoutBase(req.params.id);
  res.send("ok");
});

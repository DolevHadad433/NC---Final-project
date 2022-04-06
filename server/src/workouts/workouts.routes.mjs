import { Router } from "express";

import {
  getAllWorkouts,
  getWorkoutById,
  createNewWorkout,
  editWorkout,
  deleteWorkout,
} from "./workouts.data.mjs";

export const WorkoutsRouters = Router();

// READ - Get all workouts
WorkoutsRouters.get("/", async (req, res) => {
  res.send(await getAllWorkouts());
});

// CREATE - Create a new workouts
WorkoutsRouters.post("/", async (req, res) => {
  res.send(await createNewWorkout(req.body));
});

// READ - Get workouts by ID
WorkoutsRouters.get("/:id", async (req, res) => {
  res.send(await getWorkoutById(req.params.id));
});

// UPDATE - Update workouts by ID
WorkoutsRouters.put("/:id", async (req, res) => {
  res.send(await editWorkout(req.params.id, req.body));
});

// DELETE - Delete workouts by ID
WorkoutsRouters.delete("/:id", async (req, res) => {
  await deleteWorkout(req.params.id);
  res.send("ok");
});

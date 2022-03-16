import { Router } from "express";

import {
  getAllSchedules,
  createNewSchedule,
  getScheduleById,
  editSchedule,
  deleteSchedule,
} from "./scheduled.data.mjs";

export const SchedulesRouters = Router();

// READ - Get all schedules
SchedulesRouters.get("/", async (req, res) => {
  res.send(await getAllSchedules());
});

// CREATE - Create a new schedule
SchedulesRouters.post("/", async (req, res) => {
  res.send(await createNewSchedule(req.body));
});

// READ - Get schedule by ID
SchedulesRouters.get("/:id", async (req, res) => {
  res.send(await getScheduleById(req.params.id));
});

// UPDATE - Update schedule by ID
SchedulesRouters.put("/:id", async (req, res) => {
  res.send(await editSchedule(req.params.id, req.body));
});

// DELETE - Delete schedule by ID
SchedulesRouters.delete("/:id", async (req, res) => {
  await deleteSchedule(req.params.id);
  res.send("ok");
});

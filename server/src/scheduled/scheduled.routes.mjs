import { Router } from "express";

import {
  getAllSchedules,
  createNewSchedule,
  getScheduleById,
  editSchedule,
  deleteSchedule,
  getScheduleByUserId,
} from "./scheduled.data.mjs";

export const SchedulesRouters = Router();

// READ - Get all schedules
SchedulesRouters.post("/", async (req, res) => {
  res.send(await getAllSchedules(req.body));
});

// CREATE - Create a new schedule
SchedulesRouters.post("/create", async (req, res) => {
  res.send(await createNewSchedule(req.body));
});

// READ - Get schedule by ID
SchedulesRouters.get("/:id", async (req, res) => {
  res.send(await getScheduleById(req.params.id));
});

// READ - Get schedule by user ID
SchedulesRouters.post("/userID", async (req, res) => {
  res.send(await getScheduleByUserId(req.body));
});

// UPDATE - Update schedule by ID
SchedulesRouters.put("/:id", async (req, res) => {
  res.send(await editSchedule(req.params.id, req.body));
});

// DELETE - Delete schedule by ID
SchedulesRouters.delete("/:id", async (req, res) => {
  res.send(await deleteSchedule(req.params.id));
});

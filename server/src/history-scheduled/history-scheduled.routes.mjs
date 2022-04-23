import { Router } from "express";

import {
  getAllHistoryScheduled,
  getHistoryScheduledById,
  createNewHistoryScheduled,
  editHistoryScheduled,
  deleteHistoryScheduled,
} from "./history-scheduled.data.mjs";

export const HistoryScheduledRouters = Router();

// READ - Get all HistoryScheduled
HistoryScheduledRouters.get("/", async (req, res) => {
  res.send(await getAllHistoryScheduled());
});

// CREATE - Create a new array of HistoryScheduled
HistoryScheduledRouters.post("/", async (req, res) => {
  res.send(await createNewHistoryScheduled(req.body));
});

// READ - Get HistoryScheduled by ID
HistoryScheduledRouters.get("/:id", async (req, res) => {
  res.send(await getHistoryScheduledById(req.params.id));
});

// UPDATE - Update HistoryScheduled by ID
HistoryScheduledRouters.put("/:id", async (req, res) => {
  res.send(await editHistoryScheduled(req.params.id, req.body));
});

// DELETE - Delete HistoryScheduled by ID
HistoryScheduledRouters.delete("/:id", async (req, res) => {
  await deleteHistoryScheduled(req.params.id);
  res.send("ok");
});

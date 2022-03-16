import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Scheduled collection
async function getScheduledCollection() {
  const db = await getDB();
  return db.collection("Scheduled");
}

// READ - Get all schedules
export async function getAllSchedules() {
  const schedules = await getScheduledCollection();
  return schedules.find({}).toArray();
}

// READ - Get schedule by ID
export async function getScheduleById(id) {
  const schedule = await getScheduledCollection();
  return schedule.findOne({_id: ObjectId(id)})
}

// CREATE - Create a new schedule
export async function createNewSchedule(newSchedule) {
  const schedule = await getScheduledCollection();
  return schedule.insertOne(newSchedule);
};

// UPDATE - Update schedule by ID
export async function editSchedule(id, newSchedule) {
  const schedule = await getScheduledCollection();
  return schedule.updateOne({_id: ObjectId(id)}, {$set: newSchedule})
};

// DELETE - Delete schedule by ID
export async function deleteSchedule(id) {
  const schedule = await getScheduledCollection();
  return schedule.deleteOne({_id:ObjectId(id)})
};




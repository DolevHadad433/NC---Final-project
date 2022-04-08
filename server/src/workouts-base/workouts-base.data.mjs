import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Workouts collection
async function getWorkoutsBaseCollection() {
  const db = await getDB();
  return db.collection("Workouts-Base");
}

// READ - Get all workouts
export async function getAllWorkoutsBase() {
  const workouts = await getWorkoutsBaseCollection();
  return workouts.find({}).toArray();
}

// READ - Get workouts by ID
export async function getWorkoutBaseById(id) {
  const workouts = await getWorkoutsBaseCollection();
  return workouts.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new workouts
export async function createNewWorkoutBase(newWorkout) {
  const workouts = await getWorkoutsBaseCollection();
  return workouts.insertOne(newWorkout);
}

// UPDATE - Update workouts by ID
export async function editWorkoutBase(id, newWorkout) {
  const workouts = await getWorkoutsBaseCollection();
  return workouts.updateOne({ _id: ObjectId(id) }, { $set: newWorkout });
}

// DELETE - Delete workouts by ID
export async function deleteWorkoutBase(id) {
  const workouts = await getWorkoutsBaseCollection();
  return workouts.deleteOne({ _id: ObjectId(id) });
}

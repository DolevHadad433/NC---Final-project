import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Workouts collection
async function getWorkoutsCollection() {
  const db = await getDB();
  return db.collection("Workouts");
}

// READ - Get all workouts
export async function getAllWorkouts() {
  const workouts = await getWorkoutsCollection();
  return workouts.find({}).toArray();
}

// READ - Get workouts by ID
export async function getWorkoutById(id) {
  const workouts = await getWorkoutsCollection();
  return workouts.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new workouts
export async function createNewWorkout(newWorkout) {
  const workouts = await getWorkoutsCollection();
  return workouts.insertOne(newWorkout);
}

// UPDATE - Update workouts by ID
export async function editWorkout(id, newWorkout) {
  const workouts = await getWorkoutsCollection();
  return workouts.updateOne({ _id: ObjectId(id) }, { $set: newWorkout });
}

// DELETE - Delete workouts by ID
export async function deleteWorkout(id) {
  const workouts = await getWorkoutsCollection();
  return workouts.deleteOne({ _id: ObjectId(id) });
}

import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Training collection
async function getTrainingCollection() {
  const db = await getDB();
  return db.collection("Training");
}

// READ - Get all training
export async function getAllTraining() {
  const training = await getTrainingCollection();
  return training.find({}).toArray();
}

// READ - Get training by ID
export async function getTrainingById(id) {
  const training = await getTrainingCollection();
  return training.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new training
export async function createNewTraining(newTraining) {
  const training = await getTrainingCollection();
  return training.insertOne(newTraining);
}

// UPDATE - Update training by ID
export async function editTraining(id, newTraining) {
  const training = await getTrainingCollection();
  return training.updateOne({ _id: ObjectId(id) }, { $set: newTraining });
}

// DELETE - Delete training by ID
export async function deleteTraining(id) {
  const training = await getTrainingCollection();
  return training.deleteOne({ _id: ObjectId(id) });
}

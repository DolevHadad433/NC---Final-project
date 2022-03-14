import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

async function getTrainingCollection() {
  const db = await getDB();
  return db.collection("Training");
}

export async function getAllTraining() {
  const training = await getTrainingCollection();
  return training.find({}).toArray();
}

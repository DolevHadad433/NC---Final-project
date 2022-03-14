import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

async function getCategoriesCollection() {
  const db = await getDB();
  return db.collection("Categories");
}

export async function getAllCategories() {
  const categories = await getCategoriesCollection();
  return categories.find({}).toArray();
}
import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Categories collection
async function getCategoriesCollection() {
  const db = await getDB();
  return db.collection("Categories");
}

// READ - Get all Categories
export async function getAllCategories() {
  const categoriesCollection = await getCategoriesCollection();
  const categories = await categoriesCollection
    .aggregate([
      {
        $lookup: {
          from: "Training",
          localField: "title",
          foreignField: "category",
          as: "trainingInfo",
        },
      },
    ])
    .toArray();
  
  return categories;
}

// READ - Get category by ID
export async function getCategoryById(id) {
  const category = await getCategoriesCollection();
  return category.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new category
export async function createNewCategory(newCategory) {
  const category = await getCategoriesCollection();
  return category.insertOne(newCategory);
}

// UPDATE - Update category by ID
export async function editCategory(id, newCategory) {
  const category = await getCategoriesCollection();
  return category.updateOne({ _id: ObjectId(id) }, { $set: newCategory });
}

// DELETE - Delete category by ID
export async function deleteCategory(id) {
  const category = await getCategoriesCollection();
  return category.deleteOne({ _id: ObjectId(id) });
}

import { Router } from "express";

import {
  getAllCategories,
  createNewCategory,
  getCategoryById,
  editCategory,
  deleteCategory,
} from "./categories.data.mjs";

export const CategoriesRouters = Router();

// READ - Get all Categories
CategoriesRouters.get("/", async (req, res) => {
  res.send(await getAllCategories());
});

// CREATE - Create a new category
CategoriesRouters.post("/", async (req, res) => {
  res.send(await createNewCategory(req.body));
});

// READ - Get category by ID
CategoriesRouters.get("/:id", async (req, res) => {
  res.send(await getCategoryById(req.params.id));
});

// UPDATE - Update category by ID
CategoriesRouters.put("/:id", async (req, res) => {
  res.send(await editCategory(req.params.id, req.body));
});

// DELETE - Delete category by ID
CategoriesRouters.delete("/:id", async (req, res) => {
  await deleteCategory(req.params.id);
  res.send("ok");
});

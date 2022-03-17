import { Router } from "express";

import {
  getAllUsers,
  createNewUser,
  // getUserById,
  editUser,
  deleteUser,
  getUserByUsername,
} from "./users.data.mjs";

export const UsersRouters = Router();

// READ - Get all Users
UsersRouters.get("/", async (req, res) => {
  res.send(await getAllUsers());
});

// CREATE - Create a new user
UsersRouters.post("/", async (req, res) => {
  res.send(await createNewUser(req.body));
});

// // READ - Get user by ID
// UsersRouters.get("/:id", async (req, res) => {
//   res.send(await getUserById(req.params.id));
// });

// READ - Get user by username
UsersRouters.get("/:username", async (req, res) => {
  res.send(await getUserByUsername(req.params.username));
});

// UPDATE - Update user by ID
UsersRouters.put("/:id", async (req, res) => {
  res.send(await editUser(req.params.id, req.body));
});

// DELETE - Delete user by ID
UsersRouters.delete("/:id", async (req, res) => {
  await deleteUser(req.params.id);
  res.send("ok");
});

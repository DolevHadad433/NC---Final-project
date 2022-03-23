import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Users collection
async function getUsersCollection() {
  const db = await getDB();
  return db.collection("Users");
}

// READ - Get all users
export async function getAllUsers() {
  const users = await getUsersCollection();
  return users.find({}).toArray();
}

// READ - Get user by ID
export async function getUserById(id) {
  const users = await getUsersCollection();
  return users.findOne({ _id: ObjectId(id) });
}

// READ - Get user by username
export async function getUserByUsernameAndPassword({ username, password }) {
  const users = await getUsersCollection();
  return users.findOne({ username, password });
}

// CREATE - Create a new user
export async function createNewUser(newUser) {
  const users = await getUsersCollection();
  return users.insertOne(newUser);
}

// UPDATE - Update user by ID
export async function editUser(id, newUser) {
  const users = await getUsersCollection();
  return users.updateOne({ _id: ObjectId(id) }, { $set: newUser });
}

// DELETE - Delete user by ID
export async function deleteUser(id) {
  const users = await getUsersCollection();
  return users.deleteOne({ _id: ObjectId(id) });
}

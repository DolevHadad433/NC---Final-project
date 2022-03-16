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
  const user = await getUsersCollection();
  return user.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new user
export async function createNewUser(newUser) {
  const user = await getUsersCollection();
  return user.insertOne(newUser);
}

// UPDATE - Update user by ID
export async function editUser(id, newUser) {
  const user = await getUsersCollection();
  return user.updateOne({ _id: ObjectId(id) }, { $set: newUser });
}

// DELETE - Delete user by ID
export async function deleteUser(id) {
  const user = await getUsersCollection();
  return user.deleteOne({ _id: ObjectId(id) });
}

import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";
import { getScheduledCollection } from "../scheduled/scheduled.data.mjs";

// GET - HistoryScheduled collection
async function getHistoryScheduledCollection() {
  const db = await getDB();
  return db.collection("HistoryScheduled");
}

// READ - Get all HistoryScheduled
export async function getAllHistoryScheduled() {
  const HistoryScheduled = await getHistoryScheduledCollection();
  return HistoryScheduled.find({}).toArray();
}

// READ - Get HistoryScheduled by ID
export async function getHistoryScheduledById(id) {
  const HistoryScheduled = await getHistoryScheduledCollection();
  return HistoryScheduled.findOne({ _id: ObjectId(id) });
}

// CREATE - Create a new array of HistoryScheduled
export async function createNewHistoryScheduled(newHistoryScheduledArr) {
  const HistoryScheduled = await getHistoryScheduledCollection();
  const schedule = await getScheduledCollection();
  try {
    const idOfScheduledThatEnded = newHistoryScheduledArr.map(async (e) => {
      if ((await HistoryScheduled.findOne({ _id: ObjectId(e._id) })) === null) {
        console.log(await HistoryScheduled.insertOne(e));
        console.log(await schedule.deleteOne({ _id: ObjectId(e._id) }));
        return e;
      } else {
        console.log("already exists");
        return null;
      }
    });
    // await HistoryScheduled.insertMany([...idOfScheduledThatEnded]);
    // console.log(`the returnd array: ${idOfScheduledThatEnded}`);
    return "ok";
  } catch (e) {
    console.log(e);
  }
}

// UPDATE - Update HistoryScheduled by ID
export async function editHistoryScheduled(id, newHistoryScheduled) {
  const HistoryScheduled = await getHistoryScheduledCollection();
  return HistoryScheduled.updateOne(
    { _id: ObjectId(id) },
    { $set: newHistoryScheduled }
  );
}

// DELETE - Delete HistoryScheduled by ID
export async function deleteHistoryScheduled(id) {
  const HistoryScheduled = await getHistoryScheduledCollection();
  return HistoryScheduled.deleteOne({ _id: ObjectId(id) });
}

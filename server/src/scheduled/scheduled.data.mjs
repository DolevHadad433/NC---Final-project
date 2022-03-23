import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Scheduled collection
async function getScheduledCollection() {
  const db = await getDB();
  return db.collection("Scheduled");
}

// READ - Get all schedules
export async function getAllSchedules() {
  const schedules = await getScheduledCollection();
  return schedules.find({}).toArray();
}

// READ - Get schedule by ID
export async function getScheduleById(id) {
  const schedule = await getScheduledCollection();
  return schedule.findOne({ _id: ObjectId(id) });
}

// READ - Get schedule by user ID
export async function getScheduleByUserId(body) {
  const schedule = await getScheduledCollection();
  const findUser = await schedule
    .aggregate([
      { $match: { userID: body.userID } }, //find the user id that we want to get his scheduled training.
      {
        $lookup: {
          //searching collection name
          from: "Training",
          //setting variable [trainingID] where your string converted to ObjectId
          let: { trainingID: { $toObjectId: body.trainingID } },
          //search query with our [trainingID] value
          pipeline: [
            //searching [trainingID] value equals your field [id]
            { $match: { $expr: "trainingID" } },
          ],

          as: "trainingInfo",
        },
      },
    ])
    .toArray();

  const arr = findUser.map((e) => {
    const newArr = [];
    e.trainingInfo.filter((training) => {
      if (String(training._id) === e.trainingID) newArr.push(training);
    });
    return newArr;
  });
  const newArr = arr.map((e) => {
    return e[0];
  });


  return newArr;
}

// CREATE - Create a new schedule
export async function createNewSchedule(newSchedule) {
  const schedule = await getScheduledCollection();
  return schedule.insertOne(newSchedule);
}

// UPDATE - Update schedule by ID
export async function editSchedule(id, newSchedule) {
  const schedule = await getScheduledCollection();
  return schedule.updateOne({ _id: ObjectId(id) }, { $set: newSchedule });
}

// DELETE - Delete schedule by ID
export async function deleteSchedule(id) {
  const schedule = await getScheduledCollection();
  return schedule.deleteOne({ _id: ObjectId(id) });
}

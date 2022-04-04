import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Scheduled collection
async function getScheduledCollection() {
  const db = await getDB();
  return db.collection("Scheduled");
}

// // READ - Get all schedules
// export async function getAllSchedules() {
//   const schedules = await getScheduledCollection();
//   return schedules.find({}).toArray();
// }

// READ - Get all schedules
export async function getAllSchedules(body) {
  const schedule = await getScheduledCollection();
  const findUser = await schedule
    .aggregate([
      {
        $lookup: {
          //searching collection name
          from: "Training",
          //setting variable [findTrainingID] where your string converted to ObjectId
          let: { findTrainingID: { $toObjectId: body.trainingID } },
          //search query with our [trainingID] value
          pipeline: [
            //searching [trainingID] value equals your field [id]
            { $match: { $expr: "findTrainingID" } },
          ],
          as: "trainingInfo",
        },
      },
      {
        $unwind: "$trainingInfo",
      },
    ])
    .toArray();
  const findTrainingInfo = findUser.filter((e) => {
    if (e.trainingID === String(e.trainingInfo._id)) {
      return e.trainingInfo;
    }
  });
  return findTrainingInfo;
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
      {
        $match: { userID: body.userID },
      }, //filter the matches by the user id that we want to get his scheduled training.
      {
        $lookup: {
          //searching collection name
          from: "Training",
          //setting variable [findTrainingID] where your string converted to ObjectId
          let: { findTrainingID: { $toObjectId: body.trainingID } },
          //search query with our [trainingID] value
          pipeline: [
            //searching [trainingID] value equals your field [id]
            { $match: { $expr: "findTrainingID" } },
          ],

          as: "trainingInfo",
        },
      },
      {
        $unwind: "$trainingInfo",
      },
    ])
    .toArray();
  const findTrainingInfo = findUser.filter((e) => {
    if (e.trainingID === String(e.trainingInfo._id)) {
      return e.trainingInfo;
    }
  });
  return findTrainingInfo;
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

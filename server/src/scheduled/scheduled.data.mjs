import { getDB } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

// GET - Scheduled collection
async function getScheduledCollection() {
  const db = await getDB();
  return db.collection("Scheduled");
}

// READ - Get all schedules
export async function getAllSchedules(body) {
  const schedule = await getScheduledCollection();
  const findUser = await schedule
    .aggregate([
      {
        $lookup: {
          //searching collection name
          from: "Workouts",
          //setting variable [findWorkoutID] where your string converted to ObjectId
          let: { findWorkoutID: { $toObjectId: body.workoutID } },
          //search query with our [workoutID] value
          pipeline: [
            //searching [workoutID] value equals your field [id]
            { $match: { $expr: "findWorkoutID" } },
          ],
          as: "workoutInfo",
        },
      },
      {
        $unwind: "$workoutInfo",
      },
    ])
    .toArray();
  const findWorkoutInfo = findUser.filter((e) => {
    if (e.workoutID === String(e.workoutInfo._id)) {
      return e.workoutInfo;
    }
  });
  return findWorkoutInfo;
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
      }, //filter the matches by the user id that we want to get his scheduled workout.
      {
        $lookup: {
          //searching collection name
          from: "Workout",
          //setting variable [findWorkoutID] where your string converted to ObjectId
          let: { findWorkoutID: { $toObjectId: body.workoutID } },
          //search query with our [workoutID] value
          pipeline: [
            //searching [workoutID] value equals your field [id]
            { $match: { $expr: "findWorkoutID" } },
          ],

          as: "workoutInfo",
        },
      },
      {
        $unwind: "$workoutInfo",
      },
    ])
    .toArray();
  const findWorkoutInfo = findUser.filter((e) => {
    if (e.workoutID === String(e.workoutInfo._id)) {
      return e.workoutInfo;
    }
  });
  return findWorkoutInfo;
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

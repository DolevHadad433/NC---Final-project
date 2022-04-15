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

// DELETE - Delete schedule by ID and return the deleted one in order to inform the user
export async function deleteSchedule(id) {
  const schedule = await getScheduledCollection();

  async function scheduleToReturnByEnteredScheduledID(
    enteredSchedule_id,
    enterWorkoutID
  ) {
    const getSchedule = await getScheduledCollection();
    const getWorkoutInfo = await getSchedule
      .aggregate([
        {
          $match: { _id: enteredSchedule_id },
        },
        {
          $lookup: {
            from: "Workouts",
            let: { findWorkoutID: { $toObjectId: enterWorkoutID } },
            pipeline: [{ $match: { $expr: "findWorkoutID" } }],
            as: "workoutInfo",
          },
        },
        {
          $unwind: "$workoutInfo",
        },
      ])
      .toArray();
    const returnedWorkoutInfo = await getWorkoutInfo.filter((e) => {
      if (e.workoutID === String(e.workoutInfo._id)) {
        return e.workoutInfo;
      }
    });
    return returnedWorkoutInfo;
  }

  async function scheduleToReturnByEnteredWorkoutID(enterWorkoutID) {
    const getSchedule = await getScheduledCollection();
    const getWorkoutInfo = await getSchedule
      .aggregate([
        {
          $match: { workoutID: enterWorkoutID },
        },
        {
          $lookup: {
            from: "Workouts",
            let: { findWorkoutID: { $toObjectId: enterWorkoutID } },
            pipeline: [{ $match: { $expr: "findWorkoutID" } }],
            as: "workoutInfo",
          },
        },
        {
          $unwind: "$workoutInfo",
        },
      ])
      .toArray();
    const returnedWorkoutInfo = await getWorkoutInfo.filter((e) => {
      if (e.workoutID === String(e.workoutInfo._id)) {
        return e.workoutInfo;
      }
    });
    return returnedWorkoutInfo;
  }

  const deleteFromWorkouts = await schedule
    .aggregate([
      {
        $match: { workoutID: id },
      },
    ])
    .toArray();

  if (
    (await schedule.findOne({ _id: ObjectId(id) })) === null &&
    deleteFromWorkouts.length === 0
  ) {
    const noGymnests = "There are no gymnests for this workout!";
    return JSON.stringify(noGymnests);

    // ==================
  } else if (deleteFromWorkouts.length !== 0) {
    const returnValue = await scheduleToReturnByEnteredWorkoutID(id);
    await schedule.deleteMany({ workoutID: id });
    return returnValue;

    //================
  } else if ((await schedule.findOne({ _id: ObjectId(id) })) !== null) {
    const deleteFromSchedule = await schedule.findOne({ _id: ObjectId(id) });
    const returnValue = await scheduleToReturnByEnteredScheduledID(
      await deleteFromSchedule._id,
      await deleteFromSchedule.workoutID
    );
    await schedule.deleteOne({ _id: returnValue[0]._id });
    return returnValue[0];
  }
}

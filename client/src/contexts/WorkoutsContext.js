//============ Imports and properties start ============
import React, { useState, useContext } from "react";
import useWorkouts from "../utils/useWorkouts";
import useSchedulesForAdmin from "../utils/useSchedulesForAdmin";
import useSchedulesForUsers from "../utils/useSchedulesForUsers";
import useWorkoutsBase from "../utils/useWorkoutsBase";
import useWorkoutsCategories from "../utils/useWorkoutsCategories";
import useUsername from "../utils/useUsername";

const Context = React.createContext({});
//============ Imports and properties end ============

//============ Context start ============
function WorkoutsProvider({ children }) {
  const [deletedWorkout, setDeletedWorkout] = useState("");
  const [updateWorkout, setUpdateWorkout] = useState("");
  const [updateScheduled, setUpdateScheduled] = useState("");
  const workoutsList = useWorkouts(deletedWorkout, updateScheduled);
  const schedulesForAdmin = useSchedulesForAdmin(
    deletedWorkout,
    updateScheduled
  );
  const schedulesForUsers = useSchedulesForUsers(
    deletedWorkout,
    updateScheduled
  );
  const workoutBaseList = useWorkoutsBase();
  const categoriesList = useWorkoutsCategories();
  const userNamesForSchedules = useUsername();

  const value = {
    workoutsList,
    schedulesForAdmin,
    schedulesForUsers,
    workoutBaseList,
    categoriesList,
    userNamesForSchedules,
    deletedWorkout,
    setDeletedWorkout,
    updateScheduled,
    setUpdateScheduled,
    updateWorkout,
    setUpdateWorkout,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
//============ Context end ============

//============ functions start ============
function useWorkoutsContext() {
  return useContext(Context);
}
//============ functions end ============

export { WorkoutsProvider, useWorkoutsContext };

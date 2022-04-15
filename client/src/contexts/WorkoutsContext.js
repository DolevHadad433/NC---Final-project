//============ Imports and properties start ============
import React, { useState, useContext } from "react";
import useWorkouts from "../utils/useWorkouts";
import useSchedulesForAdmin from "../utils/useSchedulesForAdmin";
import useSchedulesForUsers from "../utils/useSchedulesForUsers";
import useWorkoutsBase from "../utils/useWorkoutsBase";
import useWorkoutsCategories from "../utils/useWorkoutsCategories";
import useUsername from "../utils/useUsername";
import useDeleteWorkout from "../utils/useDeleteWorkout";
import useSubscribeWorkout from "../utils/useSubscribeWorkout";
import useUnsubscribeWorkout from "../utils/useUnsubscribeWorkout";
import useUpdateWorkout from "../utils/useUpdateWorkout";

const Context = React.createContext({});
//============ Imports and properties end ============

//============ Context start ============
function WorkoutsProvider({ children }) {
  // const { deleteWorkoutHandler, deletedWorkout } = useDeleteWorkout();
  // const [updateScheduled, setUpdateScheduled] = useState("");
  // const {
  //   subscribeHandler,
  //   unsubscribeHandler,
  //   updateWorkout,
  //   updateScheduled,
  // } = useUpdateWorkout();
  const [updateSubscribe, subscribeHandler] = useSubscribeWorkout();

  const [updateUnsubscribe, unsubscribeHandler] = useUnsubscribeWorkout();

  const workoutsList = useWorkouts(updateSubscribe, updateUnsubscribe);

  const schedulesForAdmin = useSchedulesForAdmin(
    updateSubscribe,
    updateUnsubscribe
  );

  const schedulesForUsers = useSchedulesForUsers(
    updateSubscribe,
    updateUnsubscribe
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
    updateSubscribe,
    updateUnsubscribe,
    // deletedWorkout,
    // deleteWorkoutHandler,
    // subscribeHandler,
    // unsubscribeHandler,
    // updateWorkout,
    // updateScheduled,
    // unsubscribeUpdateWorkout,
    // unsubscribeUpdateScheduled,
    // subscribeUpdateScheduled,
    // subscribeUpdateWorkout,
    // setUpdateScheduled,
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

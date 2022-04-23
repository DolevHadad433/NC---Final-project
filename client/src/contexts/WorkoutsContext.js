//============ Imports and properties start ============
import React, { useState, useContext, useMemo, useCallback } from "react";
import useWorkouts from "../utils/useWorkouts";
import useSchedulesForAdmin from "../utils/useSchedulesForAdmin";
import useSchedulesForUsers from "../utils/useSchedulesForUsers";
import useWorkoutsBase from "../utils/useWorkoutsBase";
import useWorkoutsCategories from "../utils/useWorkoutsCategories";
import useUsername from "../utils/useUsername";
import useHistoryScheduled from "../utils/useHistoryScheduled";
import useAddScheduledThatEnded from "../utils/useUpdateHistoryScheduled";

const Context = React.createContext({});
//============ Imports and properties end ============

//============ Context start ============
function WorkoutsProvider({ children }) {
  const [workoutsList, setWorkoutsList] = useWorkouts();
  const [workoutBaseList, setWorkoutBaseList] = useWorkoutsBase();
  const [categoriesList, setCategoriesList] = useWorkoutsCategories();
  const [userNames, setUserNames] = useUsername();
  const [schedulesForAdmin, setScheduledForAdmin] = useSchedulesForAdmin();
  const [schedulesForUsers, setScheduledForUsers] = useSchedulesForUsers();
  const [historyScheduledList, setHistoryScheduledList] = useHistoryScheduled();

  function whatIsYourUserName(userId) {
    const username = userNames.find((e) => e._id === userId);
    if (username !== undefined) {
      return username.username;
    } else return "";
  }

  const value = useMemo(() => {
    return {
      workoutsList,
      setWorkoutsList,
      workoutBaseList,
      setWorkoutBaseList,
      categoriesList,
      setCategoriesList,
      userNames,
      setUserNames,
      schedulesForAdmin,
      setScheduledForAdmin,
      schedulesForUsers,
      setScheduledForUsers,
      whatIsYourUserName,
      historyScheduledList,
      setHistoryScheduledList,
    };
  }, [
    workoutsList,
    schedulesForAdmin,
    schedulesForUsers,
    historyScheduledList,
  ]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
//============ Context end ============

//============ functions start ============
function useWorkoutsContext() {
  return useContext(Context);
}
//============ functions end ============

export { WorkoutsProvider, useWorkoutsContext };

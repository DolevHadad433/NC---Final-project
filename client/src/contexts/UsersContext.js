//============ Imports and properties start ============
import React, { useContext, useMemo, useReducer, useCallback, useEffect } from "react";
const Context = React.createContext({});
//============ Imports and properties end ============

//============ Reducer properties start ============
export const Actions = {
  logInSuccess: "log-in-success",
  logOutSuccess: "log-out-from-main-page",
  signUpSuccess: "sign-up-success",
  getLocalStorage: "get-localstorage",
  updateScheduledTraining: "update-scheduled-training",
  isAdmin: "is-admin",
};
function userReducer(state, action) {
  switch (action.type) {
    case Actions.logInSuccess:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        userID: action.payload._id,
      };
    case Actions.logOutSuccess:
      return {
        ...state,
        username: "",
        password: "",
        phoneNumber: "",
        userID: "",
        scheduledTraining: "",
      };
    case Actions.signUpSuccess:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        userID: action.payload.userID,
      };
    case Actions.getLocalStorage:
      return {
        ...state,
        username: action.payload,
      };
    case Actions.updateScheduledTraining:
      return {
        ...state,
        scheduledTraining: action.payload,
      };
    case Actions.isAdmin:
      return {
        ...state,
        isAdmin: true,
      };
    default:
      return state;
  }
}
const initialState = {
  username: "",
  password: "",
  phoneNumber: "",
  userID: "",
  scheduledTraining: [],
  isLoading: false,
  isAdmin: false,
};
//============ Reducer properties end ============

//============ Context start ============
function UsersProvider({ children }) {
  const [userContextState, userContextDispatch] = useReducer(
    userReducer,
    initialState
  );
  // let isAdmin = false;

  const isAdmin = useCallback(() => {
    if (
      getUsernameFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
        "Admin" &&
      getUserIdFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
        "62335b9fed5fccd856d8f6bc"
    ) {
      // userContextDispatch({ type: Actions.isAdmin });
      return true;
    }
  });

  const value = useMemo(
    () => ({
      userContextState,
      userContextDispatch,
      isAdmin,
    }),
    [userContextState]
  );

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }
  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }


  return <Context.Provider value={value}>{children}</Context.Provider>;
}
//============ Context end ============

//============ functions start ============
function useUsersContext() {
  return useContext(Context);
}
//============ functions end ============

export { UsersProvider, useUsersContext };

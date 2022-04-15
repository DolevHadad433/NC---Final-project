//============ Imports and properties start ============
import React, {
  useContext,
  useMemo,
  useReducer,
  useCallback,
  useEffect,
} from "react";
const Context = React.createContext({});
//============ Imports and properties end ============

//============ Reducer properties start ============

function getUsernameFromLocalStorage(obj) {
  return obj.username;
}

function getUserIdFromLocalStorage(obj) {
  return obj.userID;
}

export const Actions = {
  logInSuccess: "log-in-success",
  logOutSuccess: "log-out-from-main-page",
  signUpSuccess: "sign-up-success",
  getLocalStorage: "get-localstorage",
  isAdmin: "is-admin",
};
function userReducer(state, action) {
  switch (action.type) {
    case Actions.logInSuccess:
      return {
        ...state,
        username: getUsernameFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
        userID: getUserIdFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
      };
    case Actions.logOutSuccess:
      return {
        ...state,
        username: "",
        password: "",
        phoneNumber: "",
        userID: "",
        scheduledWorkouts: "",
        subscribedWorkouts: [],
      };
    case Actions.signUpSuccess:
      return {
        ...state,
        username: action.payload.username,

        phoneNumber: action.payload.phoneNumber,
        userID: action.payload.userID,
      };
    case Actions.getLocalStorage:
      return {
        ...state,
        username: action.payload,
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
  username: getUsernameFromLocalStorage(
    JSON.parse(localStorage.getItem("User"))
  ),
  password: "",
  phoneNumber: "",
  userID: getUserIdFromLocalStorage(JSON.parse(localStorage.getItem("User"))),
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

  const isAdmin = useCallback(() => {
    if (
      getUsernameFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
        "Admin" &&
      getUserIdFromLocalStorage(JSON.parse(localStorage.getItem("User"))) ===
        "62563bfb437e7853468303f4"
    ) {
      return true;
    } else return false;
  });

  const value = {
    userContextState,
    userContextDispatch,
    isAdmin,
  };

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

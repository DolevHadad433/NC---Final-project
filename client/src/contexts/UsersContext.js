import React, { useContext, useMemo, useReducer } from "react";

const Context = React.createContext({});

export const Actions = {
  logInSuccess: "log-in-success",
  logOutSuccess: "log-out-from-main-page",
  signUpSuccess: "sign-up-success",
  getLocalStorage: "get-localstorage",
  updateScheduledTraining: "update-scheduled-training",
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
    default:
      return state;
  }
}

const initialState = {
  username: "",
  password: "",
  phoneNumber: "",
  userID: "",
  scheduledTraining: "",
  isLoading: false,
};

function UsersProvider({ children }) {
  const [userContextState, userContextDispatch] = useReducer(
    userReducer,
    initialState
  );

  const value = useMemo(
    () => ({
      userContextState,
      userContextDispatch,
    }),
    [userContextState]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useUsersContext() {
  return useContext(Context);
}

export { UsersProvider, useUsersContext };

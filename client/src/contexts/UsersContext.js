import React, { useContext, useMemo, useReducer } from "react";

const Context = React.createContext({});

export const Actions = {
  LogInSuccess: 'log-in-success'
}

function userReducer(state, action) {
  switch (action.type) {
    case Actions.LogInSuccess:
      return {
        ...state,
        isLoggedIn: true,
        isSignUp: true,
        showLoginForm: false,
        showSignUpForm: false,
      };
    case "log-out-from-main-page":
      return {
        ...state,
        isLoggedIn: false,
        isSignUp: false,
        showSignUpForm: false,
        showLoginForm: true,
      };
    case "show-sign-up-form":
      return {
        ...state,
        isLoggedIn: false,
        isSignUp: false,
        showSignUpForm: true,
        showLoginForm: false,
      };
    case "show-login-form":
      return {
        ...state,
        isLoggedIn: false,
        isSignUp: false,
        showSignUpForm: false,
        showLoginForm: true,
      };
    case "sign-up-success":
      return {
        ...state,
        isLoggedIn: true,
        isSignUp: true,
        showLoginForm: false,
        showSignUpForm: false,
      };
    default:
      return state;
  }
}

const initialState = {
  username: "",
  password: "",
  phoneNumber: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
  isSignUp: false,
  showLoginForm: true,
  showSignUpForm: false,
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

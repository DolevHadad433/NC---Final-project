import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { useUsersContext, Actions } from "../../contexts/UsersContext";

import "./Login.css";

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "error":
      return {
        ...state,
        error: "Incorrect username or password!",
      };
    case "stop_loading":
      return {
        ...state,
        isLoading: false,
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      break;
  }
  return state;
}

const initialLoginState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
};

function LogIn() {
  const [loginState, dispatchLogIn] = useReducer(
    loginReducer,
    initialLoginState
  );
  const clickLogInHandler = useNavigate();
  const clickDontHaveUserHandler = useNavigate();

  const { userContextState, userContextDispatch } = useUsersContext();

  async function onLogInSubmit(e) {
    e.preventDefault();

    dispatchLogIn({ type: "login" });

    try {
      const response = await fetch(`/api/users/${loginState.username}`);
      const userData = await response.json();
      if (
        userData.username === loginState.username &&
        userData.password === loginState.password
      ) {
        userContextDispatch({
          type: Actions.logInSuccess,
          payload: { ...userData },
        });
        localStorage.setItem("username", loginState.username);
        setTimeout(() => {
          dispatchLogIn({ type: "stop_loading" });
          clickLogInHandler("/main-page");
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatchLogIn({ type: "error" });
        dispatchLogIn({ type: "stop_loading" });
      }, 1000);
    }
  }

  function onDontHaveUserHandler() {
    clickDontHaveUserHandler("/sign-up");
  }

  return (
    <div className="LogIn">
      <div className="login-container">
        <form className="login-form" onSubmit={onLogInSubmit}>
          {loginState.error && <p className="error">{loginState.error}</p>}
          <p>Please Login</p>
          <input
            type="text"
            placeholder="User Name"
            value={loginState.username}
            onChange={(e) =>
              dispatchLogIn({
                type: "field",
                field: "username",
                value: e.currentTarget.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={loginState.password}
            onChange={(e) =>
              dispatchLogIn({
                type: "field",
                field: "password",
                value: e.currentTarget.value,
              })
            }
          />
          <button
            type="submit"
            className="submit-button"
            disabled={loginState.isLoading}
          >
            {loginState.isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <button className="sign-up-link-button" onClick={onDontHaveUserHandler}>
          Don't have a user? Click here to sign up!
        </button>
      </div>
    </div>
  );
}

export default LogIn;

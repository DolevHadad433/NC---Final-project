import React, { useReducer } from "react";

import SignUp from "../SignUp/SignUp";
import { login } from "./LoginCheck";
import "./Login.css";
import MainPage from "../MainPage/MainPage";

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
        password: "",
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
    case "log_out":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
        signUpIsShow: false,
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "show_sign_up_form":
      return {
        ...state,
        signUpIsShow: true,
      };
      break;

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
  isLoggedIn: false,
  signUpIsShow: false,
};

function LogIn() {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const { username, password, signUpIsShow } = state;

  async function subminLoginHandler(event) {
    event.preventDefault();

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }

    dispatch({ type: "stop_loading" });
  }

  if (signUpIsShow) {
    return (
      <div>
        <SignUp logOut={() => dispatch({ type: "log_out" })} />
      </div>
    );
  } else if (state.isLoggedIn) {
    return (
      <MainPage
        username={state.username}
        logOut={() => dispatch({ type: "log_out" })}
      />
    );
  } else {
    return (
    <div className="LogIn">
      <div className="login-container">
        <form className="form" onSubmit={subminLoginHandler}>
          {state.error && <p className="error">{state.error}</p>}
          <p>Please Login</p>
          <input
            type="text"
            placeholder="User Name"
            value={state.username}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "username",
                value: e.currentTarget.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "password",
                value: e.currentTarget.value,
              })
            }
          />
          <button
            type="submit"
            className="submit-button"
            disabled={state.isLoading}
          >
            {state.isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <button
          className="sign-up-link-button"
          onClick={() => dispatch({ type: "show_sign_up_form" })}
        >
          Don't have a user? Click here to sign up!
        </button>
      </div>
    </div>
    );
  }
}

export default LogIn;

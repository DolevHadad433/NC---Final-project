import React, { useReducer } from "react";

import { signup } from "./SignUpCheck";
import MainPage from "../MainPage/MainPage";

import "./SignUp.css";

function signUpReducer(state, action) {
  switch (action.type) {
    case "new_signUp_trying":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "signUp_success":
      return {
        ...state,
        isSignUp: true,
        password: "",
        error: "",
      };
    case "signUp_error":
      return {
        ...state,
        error: `Error!
        Please fill out the form correctly!`,
      };
    case "signUp_stop_loading":
      return {
        ...state,
        isLoading: false,
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
      break;

    default:
      break;
  }

  return state;
}

const initialSignUpState = {
  username: "",
  password: "",
  phoneNumber: "",
  isLoading: false,
  error: "",
  isSignUp: false,
};

function SignUp(props) {
  const [state, dispatch] = useReducer(signUpReducer, initialSignUpState);
  const { username, password, phoneNumber } = state;

  async function subminSignupHandler(event) {
    event.preventDefault();

    dispatch({ type: "new_signUp_trying" });

    try {
      await signup({ username, password, phoneNumber });
      dispatch({ type: "signUp_success" });
    } catch (error) {
      dispatch({ type: "signUp_error" });
    }

    dispatch({ type: "signUp_stop_loading" });
  }

  if (state.isSignUp) {
    return <MainPage username={state.username} logOut={props.logOut} />;
  } else {
    return (
      <div className="SignUp">
        <div className="sigup-container">
          <form className="form" onSubmit={subminSignupHandler}>
            {state.error && <p className="error">{state.error}</p>}
            <p>Please Sign-up</p>
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
            <input
              type="tel"
              placeholder="Phone number"
              value={state.phoneNumber}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "phoneNumber",
                  value: e.currentTarget.value,
                })
              }
            />
            <button
              type="submit"
              className="submit-button"
              disabled={state.isLoading}
            >
              {state.isLoading ? "Please wait..." : "Sign Up"}
            </button>
          </form>
          <button className="login-link-button" onClick={props.logOut}>
            Already have a user? Click here to login!
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;

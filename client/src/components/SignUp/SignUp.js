import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";

import { signup } from "./SignUpCheck";

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
    default:
      return state;
  }
}

const initialSignUpState = {
  username: "",
  password: "",
  phoneNumber: "",
  isLoading: false,
  error: "",
};

function SignUp() {
  const [signUpState, dispatchSignUp] = useReducer(
    signUpReducer,
    initialSignUpState
  );
  const { username, password, phoneNumber } = signUpState;

  const { userContextState, userContextDispatch } = useUsersContext();
  const clickSignUpHandler = useNavigate();
  const clickAlreadyHaveUserHandler = useNavigate();

  async function onSubmitSignUpHandler(e) {
    e.preventDefault();

    dispatchSignUp({ type: "new_signUp_trying" });

    try {
      await signup({ username, password, phoneNumber });
      dispatchSignUp({ type: "signUp_success" });
      clickSignUpHandler("/main-page");
    } catch (error) {
      dispatchSignUp({ type: "signUp_error" });
      dispatchSignUp({ type: "signUp_stop_loading" });
    }
  }

  function onAlreadyHaveUserClickHandler() {
    clickAlreadyHaveUserHandler("/");
  }

  return (
    <div className="SignUp">
      <div className="sigup-container">
        <form className="form" onSubmit={onSubmitSignUpHandler}>
          {signUpState.error && <p className="error">{signUpState.error}</p>}
          <p>Please Sign-up</p>
          <input
            type="text"
            placeholder="User Name"
            value={signUpState.username}
            onChange={(e) =>
              dispatchSignUp({
                type: "field",
                field: "username",
                value: e.currentTarget.value,
              })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={signUpState.password}
            onChange={(e) =>
              dispatchSignUp({
                type: "field",
                field: "password",
                value: e.currentTarget.value,
              })
            }
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={signUpState.phoneNumber}
            onChange={(e) =>
              dispatchSignUp({
                type: "field",
                field: "phoneNumber",
                value: e.currentTarget.value,
              })
            }
          />
          <button
            type="submit"
            className="submit-button"
            disabled={signUpState.isLoading}
          >
            {signUpState.isLoading ? "Please wait..." : "Sign Up"}
          </button>
        </form>
        <button
          className="login-link-button"
          onClick={onAlreadyHaveUserClickHandler}
        >
          Already have a user? Click here to login!
        </button>
      </div>
    </div>
  );
}

export default SignUp;

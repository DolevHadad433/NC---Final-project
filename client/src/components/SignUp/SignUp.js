//============ Imports start ============
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import "./SignUp.css";
//============ Imports end ============

//============ Reducer properties start ============
function signUpReducer(state, action) {
  switch (action.type) {
    case "new_signUp_trying":
      return {
        ...state,
        isLoading: true,
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
//============ Reducer properties end ============

//============ Component start ============
function SignUp() {
  const [signUpState, dispatchSignUp] = useReducer(
    signUpReducer,
    initialSignUpState
  );
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickSignUpHandler = useNavigate();
  const clickAlreadyHaveUserHandler = useNavigate();

  async function onSubmitSignUpHandler(e) {
    e.preventDefault();

    dispatchSignUp({ type: "new_signUp_trying" });

    try {
      const response = await fetch("/api/users/post", {
        method: "POST",
        body: JSON.stringify({
          username: signUpState.username,
          password: signUpState.password,
          phoneNumber: signUpState.phoneNumber,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const userData = await response.json();
      userContextDispatch({
        type: Actions.signUpSuccess,
        payload: {
          username: signUpState.username,
          password: signUpState.password,
          phoneNumber: signUpState.phoneNumber,
          userID: userData.insertedId,
        },
      });
      localStorage.setItem(
        "User",
        JSON.stringify({
          username: signUpState.username,
          userID: userData.insertedId,
        })
      );
      setTimeout(() => {
        dispatchSignUp({ type: "signUp_stop_loading" });
        clickSignUpHandler("/main-page");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatchSignUp({ type: "signUp_error" });
        dispatchSignUp({ type: "signUp_stop_loading" });
      }, 1000);
    }
  }

  function onAlreadyHaveUserClickHandler() {
    clickAlreadyHaveUserHandler("/");
  }

  return (
    <div className="SignUp">
      <div className="sigup-container">
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "34ch" },
          }}
        >
          <form className="signup-form" onSubmit={onSubmitSignUpHandler}>
            {signUpState.error && <p className="error">{signUpState.error}</p>}

            <Typography variant="h5" gutterBottom component="div">
              Please Sign-up
            </Typography>
            <TextField
              required
              placeholder="User Name"
              type="text"
              value={signUpState.username}
              onChange={(e) =>
                dispatchSignUp({
                  type: "field",
                  field: "username",
                  value: e.currentTarget.value,
                })
              }
            />

            <TextField
              required
              placeholder="password"
              type="password"
              value={signUpState.password}
              onChange={(e) =>
                dispatchSignUp({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
            />

            <TextField
              required
              placeholder="Phone number"
              type="tel"
              value={signUpState.phoneNumber}
              onChange={(e) =>
                dispatchSignUp({
                  type: "field",
                  field: "phoneNumber",
                  value: e.currentTarget.value,
                })
              }
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              disabled={signUpState.isLoading}
            >
              {signUpState.isLoading ? "Please wait..." : "Sign Up"}
            </Button>
          </form>

          <Button
            variant="outlined"
            sx={{ mt: 3, ml: 1 }}
            onClick={onAlreadyHaveUserClickHandler}
          >
            Already have a user? Click here to login!
          </Button>
        </Box>
      </div>
    </div>
  );
}
//============ Component end ============

export default SignUp;

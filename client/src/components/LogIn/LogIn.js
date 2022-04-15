//============ Imports start ============
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import "./Login.css";
//============ Imports end ============

//============ Reducer properties start ============
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
//============ Reducer properties end ============

//============ Component start ============
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
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: loginState.username,
          password: loginState.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const userData = await response.json();

      if (userData !== undefined) {
        localStorage.setItem(
          "User",
          JSON.stringify({
            username: userData.username,
            userID: userData._id,
          })
        );
        // userContextDispatch({
        //   type: Actions.logInSuccess,
        //   payload: {...userData},
        // });

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
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "34ch" },
          }}
        >
          <form className="login-form" onSubmit={onLogInSubmit}>
            {loginState.error && <p className="error">{loginState.error}</p>}

            <Typography variant="h5" gutterBottom component="div">
              Please Login
            </Typography>

            <TextField
              required
              placeholder="User Name"
              type="text"
              value={loginState.username}
              onChange={(e) =>
                dispatchLogIn({
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
              value={loginState.password}
              onChange={(e) =>
                dispatchLogIn({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              disabled={loginState.isLoading}
            >
              {loginState.isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <Button
            variant="outlined"
            sx={{ mt: 3, ml: 1 }}
            onClick={onDontHaveUserHandler}
          >
            Don't have a user? Click here to sign up!
          </Button>
        </Box>
      </div>
    </div>
  );
}
//============ Component end ============

export default LogIn;

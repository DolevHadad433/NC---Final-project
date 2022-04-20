//============ Imports start ============
import {
  AppBar,
  Button,
  Container,
  Grid,
  Popover,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import "./SignUp.css";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import useResponsive from "../../utils/useResponsive";
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

  const { showInMobileOnly, showInDesktopToTabletVerticalOnly } =
    useResponsive();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);

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
    <>
      <Container maxWidth={"md"}>
        <Grid
          container
          spacing={2}
          style={showInDesktopToTabletVerticalOnly}
          sx={{
            pt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid item sm={10}>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>Login!</Typography>
            </Popover>
            <AppBar>
              <Toolbar>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  Welcome to My Training Manager!
                </Typography>

                <IconButton
                  color="inherit"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  onClick={onAlreadyHaveUserClickHandler}
                >
                  <LoginIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item sm={10} sx={{ mt: 4 }}>
            <form onSubmit={onSubmitSignUpHandler} style={{ padding: 0 }}>
              <Grid
                container
                rowSpacing={2}
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  pb: 4,
                }}
              >
                <Grid item sm={12} sx={{ width: "100%" }}>
                {signUpState.error && (
                    <p className="error">{signUpState.error}</p>
                  )}
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Grid item sm={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      component="div"
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      Please Sign-up
                    </Typography>
                  </Grid>

                  <Grid item sm={10}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item sm={10}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item sm={10}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item sm={4}>
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{ width: "100%" }}
                      disabled={signUpState.isLoading}
                    >
                      {signUpState.isLoading ? "Please wait..." : "Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xs">
        <Grid
          container
          spacing={2}
          style={showInMobileOnly}
          sx={{
            pt: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
              sx={{ width: "100%", textAlign: "center" }}
            >
              Welcome to My Training Manager!
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ mt: 4 }}>
            <form onSubmit={onSubmitSignUpHandler} style={{ padding: 0 }}>
              <Grid
                container
                rowSpacing={2}
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  pb: 4,
                }}
              >
                <Grid item xs={12} sx={{ width: "100%" }}>
                  {signUpState.error && (
                    <p className="error">{signUpState.error}</p>
                  )}
                </Grid>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      component="div"
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      Please Sign-up
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "100%" }}
                      disabled={signUpState.isLoading}
                    >
                      {signUpState.isLoading ? "Please wait..." : "Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={8}>
            <Button
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              onClick={onAlreadyHaveUserClickHandler}
            >
              Already have a user?
              <br />
              Click here to login!
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
//============ Component end ============

export default SignUp;

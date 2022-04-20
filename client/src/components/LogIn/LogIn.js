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
import { Box, padding } from "@mui/system";
import React, { useReducer, useState } from "react";
import useResponsive from "../../utils/useResponsive";
import { useNavigate } from "react-router-dom";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import IconButton from "@mui/material/IconButton";

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

  const { showInMobileOnly, showInDesktopToTabletVerticalOnly } =
    useResponsive();
  const clickLogInHandler = useNavigate();
  const clickDontHaveUserHandler = useNavigate();
  const { userContextState, userContextDispatch } = useUsersContext();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);

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
              <Typography sx={{ p: 1 }}>Sign up!</Typography>
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
                  onClick={onDontHaveUserHandler}
                >
                  <HistoryEduIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item sm={10} sx={{ mt: 4 }}>
            <form onSubmit={onLogInSubmit} style={{ padding: 0 }}>
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
                  {loginState.error && (
                    <p className="error">{loginState.error}</p>
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
                      Please Login
                    </Typography>
                  </Grid>

                  <Grid item sm={10}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item sm={10}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item sm={4}>
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{ width: "100%" }}
                      disabled={loginState.isLoading}
                    >
                      {loginState.isLoading ? "Logging in..." : "Log In"}
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
            <form onSubmit={onLogInSubmit} style={{ padding: 0 }}>
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
                  {loginState.error && (
                    <p className="error">{loginState.error}</p>
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
                      Please Login
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      sx={{ width: "100%" }}
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
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "100%" }}
                      disabled={loginState.isLoading}
                    >
                      {loginState.isLoading ? "Logging in..." : "Log In"}
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
              onClick={onDontHaveUserHandler}
            >
              Don't have a user?
              <br />
              Click here to sign up!
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
//============ Component end ============

export default LogIn;

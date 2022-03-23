import React, { useState } from "react";
import "./MainPage.css";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import ScheduledTrainingList from "./ScheduledTrainingList/ScheduledTrainingList";
import TrainingList from "./TrainingList/TrainingList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddingTraining from "./AddingTraining/AddingTraining";

/* =========================================================== */

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

/* =========================================================== */
function MainPage() {
  const [search, setSearch] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickLogOutHandler = useNavigate();
  const clickAddNewTraining = useNavigate();

  async function onLogOutButtonClick() {
    localStorage.setItem("User", JSON.stringify({ username: "", userID: "" }));
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  function addNewTraining() {
    clickAddNewTraining("/add-new-training");
  }

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello{" "}
                {getUsernameFromLocalStorage(
                  JSON.parse(localStorage.getItem("User"))
                )}
                !
              </Typography>
              <Search currentSearch={search} onSearch={setSearch} />

              {(function isAdmin() {
                if (
                  userContextState.username === "Admin" ||
                  userContextState.username === "admin" ||
                  getUsernameFromLocalStorage(
                    JSON.parse(localStorage.getItem("User"))
                  ) === "Admin" ||
                  getUsernameFromLocalStorage(
                    JSON.parse(localStorage.getItem("User"))
                  ) === "admin"
                ) {
                  return (
                    <Button color="inherit" onClick={addNewTraining}>
                      Add new training
                    </Button>
                  );
                }
              })()}
              <Button color="inherit" onClick={onLogOutButtonClick}>
                Log out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <Container maxWidth="lg">
        <Grid container spacing={2} direction="row" sx={{ marginTop: 5 }}>
          <Grid item sm={7}>
            <Grid container spacing={4} direction="row">
              <Grid item sm={12}>
                <div className="main-page-preference-container">
                  <TrainingCategoryChooser />
                </div>
              </Grid>

              <Grid item sm={12}>
                <div className="main-page-body">
                  <Routes>
                    <Route index element={<TrainingList search={search} />} />
                    <Route
                      path=":category"
                      element={<TrainingList search={search} />}
                    />
                  </Routes>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <ScheduledTrainingList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MainPage;

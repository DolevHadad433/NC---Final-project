import React, { useState } from "react";
import "./MainPage.css";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import ScheduledTrainings from "./ScheduledTrainings/ScheduledTrainings";
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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

/* =========================================================== */
function MainPage() {
  const [search, setSearch] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickLogOutHandler = useNavigate();
  const clickAddNewTraining = useNavigate();

  async function onLogOutButtonClick() {
    localStorage.setItem("username", "");
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  function addNewTraining() {
    clickAddNewTraining("/add-new-training");
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
                Hello {localStorage.getItem("username")}!
              </Typography>
              <Search currentSearch={search} onSearch={setSearch} />

              {(function isAdmin() {
                if (
                  userContextState.username === "Admin" ||
                  userContextState.username === "admin" ||
                  localStorage.getItem("username") === "Admin" ||
                  localStorage.getItem("username") === "admin"
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
      {/* =========================================================== */}

      {/* <div className="user-preference-container">
          <h3 className="hello-username">
            Hello {localStorage.getItem("username")}!
          </h3>

          <div className="user-tools-preference-container">
            <Search currentSearch={search} onSearch={setSearch} />

            {(function isAdmin() {
              if (
                userContextState.username === "Admin" ||
                userContextState.username === "admin" ||
                localStorage.getItem("username") === "Admin" ||
                localStorage.getItem("username") === "admin"
              ) {
                return (
                  <button className="btn" onClick={addNewTraining}>
                    Add new training
                  </button>
                );
              }
            })()}

            <button className="btn" onClick={onLogOutButtonClick}>
              Log out
            </button>
          </div>
        </div>
         */}
      <Container maxWidth={200}>
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
            <ScheduledTrainings />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MainPage;

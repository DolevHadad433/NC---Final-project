//============ Imports start ============
import React, { useState, useEffect } from "react";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import { Route, Routes, Outlet } from "react-router-dom";
import ScheduledWorkoutsList from "./ScheduledWorkoutsList/ScheduledWorkoutsList";
import WorkoutsList from "./WorkoutsList/WorkoutsList";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Search from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AppBarMain from "./ActionsAndUtils/AppBarMain";
import MyWorkouts from "./WorkoutsList/MyWorkouts/MyWorkouts";

//============ Imports end ============

//============ Component start ============
function MainPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [search, setSearch] = useState("");

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AppBarMain />
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container maxWidth="xl">
        <Grid
          container
          spacing={0}
          direction="row"
          sx={{ marginTop: 5, marginLeft: 0 }}
        >
          <Grid item sm={12}>
            <Grid container spacing={4} direction="row">
              <Grid item sm={12}>
                <div className="main-page-preference-container">
                  {/* <WorkoutsCategoryChooser /> */}
                </div>
              </Grid>

              <Grid item sm={12} align="center" sx={{ marginLeft: 0 }}>
                <div className="main-page-body">
                  <AppBar
                    position="static"
                    sx={{
                      textAlign: "center",
                      width: 250,
                      borderRadius: 2,
                      marginLeft: 3,
                      marginBottom: 4,
                      marginTop: -4,
                    }}
                  >
                    <Typography variant="h5" component="div">
                      Workouts this week:
                    </Typography>
                  </AppBar>

                  <WorkoutsList search={search} setSearch={setSearch} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <ScheduledWorkoutsList />
          </Grid>
        </Grid>
      </Container>
      <Routes>
        <Route path="/my-workouts" element={<MyWorkouts />} />
      </Routes>
      <Outlet />
    </div>
  );
}
//============ Component end ============

export default MainPage;

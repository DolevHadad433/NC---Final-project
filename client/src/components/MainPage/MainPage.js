//============ Imports start ============
import React, { useState, useEffect } from "react";
import useSubscribeWorkout from "../../utils/useSubscribeWorkout";
import useUnsubscribeWorkout from "../../utils/useUnsubscribeWorkout";
import useResponsive from "../../utils/useResponsive";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import { Route, Routes, Outlet } from "react-router-dom";
import ScheduledWorkoutsList from "./ScheduledWorkoutsList/ScheduledWorkoutsList";
import WorkoutsList from "./WorkoutsList/WorkoutList";
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
import MainMenu from "./ActionsAndUtils/MainMenu";

//============ Imports end ============

//============ Component start ============
function MainPage() {
  const {
    showInMobileOnly,
    showInTabletOnly,
    showInTabletVerticalOnly,
    showInTabletHorizontalOnly,
    showInTabletVerticalAndBelow,
    showInTabletHorizontalAndBelow,
    showInLaptopOnly,
    showInLaptopAndBelow,
    showInLaptopToTabletVertical,
    showInLaptopToTabletHorizontalOnly,
    showInDesktopToTabletVerticalOnly,
    showInDesktopToTabletHorizontalOnly,
    showInDesktopToLaptopOnly,
    showInDesktopOnly,
    showInAllWidth,
  } = useResponsive();
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} style={showInMobileOnly} >
          <Grid container spacing={0} >
            <Grid item xs={12} sx={{ justifySelf: "flex-start"}}>
              <MainMenu />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} style={showInDesktopToTabletVerticalOnly}>
          <Grid container spacing={2} rowSpacing={10}>
            <Grid item sm={12}>
              <AppBarMain />
            </Grid>
            <Grid item sm={12}>
              <Typography color="text.secondary" variant="h5" component="div">
                Workouts this week:
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={showInAllWidth}>
          <WorkoutsList search={search} setSearch={setSearch} />
        </Grid>
      </Grid>
    </Container>
  );
}
//============ Component end ============

export default MainPage;

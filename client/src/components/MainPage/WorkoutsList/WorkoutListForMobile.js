import React, { useState } from "react";
import { useUsersContext } from "../../../contexts/UsersContext";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteWorkout from "../ActionsAndUtils/DeleteWorkout";
import EditWorkout from "../ActionsAndUtils/EditWorkout";
import SubscribeWorkout from "../ActionsAndUtils/SubscribeWorkout";
import UnsubscribeWorkout from "../ActionsAndUtils/UnsubscribeWorkout";
import { Container, Divider, Switch } from "@mui/material";
import { Link } from "@mui/material";
import DisplayWorkoutsMenu from "../ActionsAndUtils/DisplayWorkoutsMenu";
import moment from "moment";
import RefreshIcon from "@mui/icons-material/Refresh";
import { v4 as uuid } from "uuid";

function WorkoutListForMobile({
  workouts,
  showAddNewWorkoutButton,
  setWorkoutsList,
}) {
  const { schedulesForAdmin, schedulesForUsers } = useWorkoutsContext();
  const [secondary, setSecondary] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const { isAdmin } = useUsersContext();
  const [secondaryAll, setSecondaryAll] = useState(false);
  const [descriptionAll, setDescriptionAll] = useState(false);
  const schedules = isAdmin() ? schedulesForAdmin : schedulesForUsers;

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const openMenu = Boolean(anchorMenu);

  function workoutAction(workout) {
    if (isAdmin()) {
      return (
        <Grid container sx={{ justifyContent: "flex-end" }}>
          <Grid item xs={6}>
            <EditWorkout workout={workout} />
          </Grid>
          <Grid item xs={6}>
            <DeleteWorkout workout={workout} />
          </Grid>
        </Grid>
      );
    } else {
      if (schedules.find((e) => e.workoutID === workout._id) === undefined) {
        return (
          <Grid container sx={{ justifyContent: "flex-end" }}>
            <Grid item xs={6}>
              <SubscribeWorkout workout={workout} />
            </Grid>
          </Grid>
        );
      } else {
        const scheduled = schedules.find((e) => e.workoutID === workout._id);
        if (scheduled !== undefined) {
          return (
            <Grid container sx={{ justifyContent: "flex-end" }}>
              <Grid item xs={6}>
                <UnsubscribeWorkout scheduled={scheduled} />
              </Grid>
            </Grid>
          );
        }
      }
    }
  }

  function thisWeekOrAfter() {
    const thisWeek = [];
    const nextWeek = [];
    workouts.map((workout) => {
      if (Number(workout.weekOfYear) === Number(moment().format("w")) + 1) {
        nextWeek.push(workout);
      } else if (Number(workout.weekOfYear) === Number(moment().format("w"))) {
        thisWeek.push(workout);
      }
      return workout;
    });
    return { thisWeek, nextWeek };
  }

  function showDivider(week) {
    if (week !== undefined && week.length > 1) {
      return true;
    } else return false;
  }

  const { thisWeek, nextWeek } = thisWeekOrAfter();

  // console.log(thisWeek);
  // console.log(nextWeek);

  return (
    <Container maxWidth={"sm"} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
      {workouts.length === 0 ? (
        <Grid container spacing={0}>
          {isAdmin() ? (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid
                container
                columnSpacing={0}
                sx={{ justifyContent: "center" }}
              >
                <Grid item xs={11} sx={{ alignSelf: "center" }}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    There are no workouts for selected day.
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={{ alignSelf: "center" }}>
                  <IconButton
                    sx={{ color: "#b3b3b3" }}
                    size="small"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={() => {
                      setWorkoutsList(`Workout list has refresh ${uuid()}`);
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={8} sx={{ alignSelf: "center", mt: 2 }}>
                  {showAddNewWorkoutButton()}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid
                container
                columnSpacing={0}
                sx={{ justifyContent: "center" }}
              >
                <Grid item xs={11}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: 17,
                    }}
                  >
                    There are no workouts for today yet!
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    sx={{ color: "#b3b3b3" }}
                    size="small"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={() => {
                      setWorkoutsList(`Workout list has refresh ${uuid()}`);
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid
          container
          spacing={0}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Grid
              container
              spacing={0}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid item xs={1} sx={{ alignSelf: "center" }}>
                <IconButton
                  sx={{ color: "#b3b3b3" }}
                  size="small"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleMenuClick}
                >
                  <SettingsIcon />
                </IconButton>
              </Grid>
              <Grid item xs={0}>
                <Grid container sx={{ justifyContent: "flex-end" }}>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorMenu}
                    open={openMenu}
                    onClose={handleMenuClose}
                  >
                    <Grid item xs={12}>
                      <MenuItem>
                        <Switch
                          checked={secondaryAll}
                          onChange={(event) => {
                            setSecondaryAll(event.target.checked);
                          }}
                        />
                        More information
                      </MenuItem>
                    </Grid>
                    <Grid item xs={12}>
                      <MenuItem>
                        <Switch
                          checked={descriptionAll}
                          onChange={(event) => {
                            setDescriptionAll(event.target.checked);
                          }}
                        />
                        Show workouts description
                      </MenuItem>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        sx={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <Grid
                          item
                          xs={2}
                          sx={{ paddingTop: 1, paddingBottom: 1 }}
                        >
                          <Link
                            href="#"
                            underline="hover"
                            onClick={handleMenuClose}
                          >
                            close
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Menu>
                </Grid>
              </Grid>
              <Grid item xs={10} sx={{ alignSelf: "center" }}>
                <Typography
                  color="text.secondary"
                  variant="h6"
                  component="div"
                  sx={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 17,
                  }}
                >
                  {isAdmin()
                    ? "Available workouts"
                    : "Subscribe to your workouts!"}
                </Typography>
              </Grid>
              <Grid item xs={1} sx={{ alignSelf: "center" }}>
                <IconButton
                  sx={{ color: "#b3b3b3" }}
                  size="small"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={() => {
                    setWorkoutsList(`Workout list has refresh ${uuid()}`);
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              {thisWeek.length > 0 ? (
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      fontSize: 13,
                      fontStyle: "italic",
                      color: "text.secondary",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    This week
                  </Divider>
                  <List>
                    {thisWeek.map((workout) => {
                      return (
                        <DisplayWorkoutsMenu
                          key={workout._id}
                          workout={workout}
                          showDivider={showDivider(thisWeek)}
                          secondaryAll={secondaryAll}
                          descriptionAll={descriptionAll}
                          workoutAction={workoutAction}
                        />
                      );
                    })}
                  </List>
                  <Divider
                    sx={{
                      fontSize: 13,
                      fontStyle: "italic",
                      color: "text.secondary",
                      mt: 1,
                      mb: 1,
                    }}
                  >
                    Next week
                  </Divider>
                </Grid>
              ) : null}
              {nextWeek.length > 0 ? (
                <Grid item xs={12}>
                  <List>
                    {nextWeek.map((workout) => {
                      return (
                        <DisplayWorkoutsMenu
                          key={workout._id}
                          workout={workout}
                          showDivider={showDivider(nextWeek)}
                          secondaryAll={secondaryAll}
                          descriptionAll={descriptionAll}
                          workoutAction={workoutAction}
                        />
                      );
                    })}
                  </List>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default WorkoutListForMobile;

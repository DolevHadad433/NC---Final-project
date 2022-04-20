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
import { Container } from "@mui/material";

function WorkoutListForMobile({ workouts, showAddNewWorkoutButton }) {
  const { schedulesForAdmin, schedulesForUsers } = useWorkoutsContext();
  const [secondary, setSecondary] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const openMenu = Boolean(anchorMenu);
  const { isAdmin } = useUsersContext();

  const schedules = isAdmin() ? schedulesForAdmin : schedulesForUsers;

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  function workoutAction(workout) {
    if (isAdmin()) {
      return (
        <Grid container sx={{ justifyContent: "flex-end" }}>
          <Grid item xs={6}>
            <EditWorkout />
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
        if (schedules.find((e) => e.workoutID === workout._id) !== undefined) {
          const scheduled = schedules.find((e) => e.workoutID === workout._id);
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

  return (
    <Container maxWidth={"xs"} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
      {workouts.length === 0 ? (
        <Grid container spacing={2}>
          {isAdmin() ? (
            <Grid item xs={12}>
              <Grid
                container
                columnSpacing={0}
                sx={{ justifyContent: "center", mt: 5 }}
              >
                <Grid item xs={8} sx={{ alignSelf: "center" }}>
                  {showAddNewWorkoutButton()}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography
                color="text.secondary"
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: 18,
                  mt: 5,
                }}
              >
                There are no workouts for today yet!
              </Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={1} sx={{ justifySelf: "flex-start" }}>
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
                <Menu
                  id="basic-menu"
                  anchorEl={anchorMenu}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Checkbox
                      checked={secondary}
                      onChange={(event) => {
                        setSecondary(event.target.checked);
                        handleMenuClose();
                      }}
                    />
                    More information
                  </MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={10} sx={{ alignSelf: "center" }}>
                <Grid container spacing={0} sx={{ justifyContent: "center" }}>
                  <Grid item xs={12}>
                    <Typography
                      color="text.secondary"
                      variant="h6"
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Subscribe to your workouts!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List>
              {workouts.map((workout) => {
                return (
                  <ListItem
                    divider
                    key={workout._id}
                    secondaryAction={<IconButton edge="end"></IconButton>}
                    sx={{ p: 1 }}
                  >
                    <Grid container>
                      <Grid item xs={9}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="h7"
                              sx={{ fontWeight: 500 }}
                              component="div"
                            >
                              {workout.title}
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "normal" }}
                                component="div"
                              >
                                {workout.dayInMonth}, {workout.time}
                              </Typography>
                            </Typography>
                          }
                          secondary={
                            secondary ? (
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "normal" }}
                                component="div"
                              >
                                Category: {workout.category}
                                <br />
                                Trainer: {workout.trainerName}
                              </Typography>
                            ) : null
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {workoutAction(workout)}
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default WorkoutListForMobile;

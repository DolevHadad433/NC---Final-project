import React, { useState } from "react";
import { useUsersContext } from "../../../contexts/UsersContext";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import UnsubscribeWorkout from "../ActionsAndUtils/UnsubscribeWorkout";
import { Container, Link } from "@mui/material";

function ScheduledWorkoutsForMobile({ whatIsYourUserName }) {
  const { schedulesForAdmin, schedulesForUsers } = useWorkoutsContext();
  const [secondary, setSecondary] = useState(false);
  const [description, setDescription] = useState(false);
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

  return (
    <Container maxWidth={"xs"} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
      {schedules.length === 0 ? (
        <Grid container spacing={2}>
          {isAdmin() ? (
            <Grid item xs={12}>
              <Grid
                container
                columnSpacing={0}
                sx={{ justifyContent: "center", mt: 5 }}
              >
                <Grid item xs={7} sx={{ alignSelf: "center" }}>
                  {/* {showAddNewWorkoutButton()} */} FIX
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
            <Grid container spacing={0} sx={{ mt: 3 }}>
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
              </Grid>
              <Grid item xs={12}>
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
                          checked={secondary}
                          onChange={(event) => {
                            setSecondary(event.target.checked);
                          }}
                        />
                        More information
                      </MenuItem>
                    </Grid>
                    <Grid item xs={12}>
                      <MenuItem>
                        <Switch
                          checked={description}
                          onChange={(event) => {
                            setDescription(event.target.checked);
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
                      {isAdmin()
                        ? "Workouts subscriptions:"
                        : "Manage your schedules workouts!"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List>
              {schedules.map((scheduled) => {
                return (
                  <ListItem
                    divider
                    key={scheduled._id}
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
                              {scheduled.workoutInfo.title}
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "normal" }}
                                component="div"
                              >
                                {scheduled.workoutInfo.dayInMonth},{" "}
                                {scheduled.workoutInfo.time}{" "}
                                {isAdmin() ? (
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: "normal" }}
                                    component="div"
                                  >
                                    Username:{" "}
                                    {whatIsYourUserName(scheduled.userID)}
                                    <br />
                                    Trainer: {scheduled.workoutInfo.trainerName}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: "normal" }}
                                    component="div"
                                  >
                                    Trainer: {scheduled.workoutInfo.trainerName}
                                  </Typography>
                                )}
                              </Typography>
                            </Typography>
                          }
                          secondary={
                            secondary ? (
                              isAdmin() ? (
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "normal" }}
                                  component="div"
                                >
                                  Category: {scheduled.workoutInfo.category}
                                  <br />
                                  Duration: {scheduled.workoutInfo.duration}
                                  <br />
                                  Group size: {scheduled.workoutInfo.groupSize}
                                  <br />
                                  Day in week: {scheduled.workoutInfo.dayInWeek}
                                  <br />
                                  Week of year:{" "}
                                  {scheduled.workoutInfo.weekOfYear}
                                  <br />
                                </Typography>
                              ) : (
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "normal" }}
                                  component="div"
                                >
                                  Category: {scheduled.workoutInfo.category}
                                  <br />
                                  Duration: {scheduled.workoutInfo.duration}
                                  <br />
                                  Group size: {scheduled.workoutInfo.groupSize}
                                  <br />
                                  Day in week: {scheduled.workoutInfo.dayInWeek}
                                  <br />
                                </Typography>
                              )
                            ) : null
                          }
                        />
                        <ListItemText
                          secondary={
                            description ? (
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "normal" }}
                                component="div"
                              >
                                Description: {scheduled.workoutInfo.description}
                              </Typography>
                            ) : null
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{
                          alignSelf: "center",
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            justifyContent: "flex-end",
                          }}
                        >
                          <Grid item xs={6}>
                            <UnsubscribeWorkout scheduled={scheduled} />
                          </Grid>
                        </Grid>
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

export default ScheduledWorkoutsForMobile;

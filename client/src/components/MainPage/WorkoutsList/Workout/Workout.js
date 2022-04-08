//============ Imports start ============
import React, { useState } from "react";

import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//============ Imports end ============

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//============ Component start ============
function Workout({ workout, deleteWorkout }) {
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();
  const [open, setOpen] = useState(false);

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  //=======Subscribe========Modal ** NOT DONE YET **=============

  async function subscribeHandler() {
    const response = await fetch("/api/schedules/create", {
      method: "POST",
      body: JSON.stringify({
        userID: getUserIdFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
        workoutID: workout._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    userContextDispatch({
      type: Actions.updateScheduledWorkouts,
      payload: { ...data },
    });
  }
  //=========================Subscribe===========================

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="Workout">
      <Container maxWidth="xxl">
        <Card sx={{ minWidth: 275, marginBottom: 1, marginRight: 5 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {workout.category}
            </Typography>
            <Typography variant="h5" component="div">
              {workout.title}:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <strong>{workout.date}</strong>
              <br />
              Group size:
              {workout.groupSize} people maximun
              <br />
              Duration:
              {workout.duration} minutes
            </Typography>
            <Typography variant="body2">{workout.description}</Typography>
            <br />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trainer: {workout.trainerName}
              <br />
              workoutID: {workout._id}
              <br />
              Description: {workout.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Container>
              <Grid container direction="row-reverse">
                {isAdmin() ? (
                  <Grid item sm={2} sx={{ marginLeft: 10, marginBottom: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleOpen}
                    >
                      Delete
                    </Button>
                    <Modal open={open} onClose={handleClose}>
                      <Box sx={style}>
                        <Typography
                          sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
                          color="text.secondary"
                        >
                          Are you sure that you want to delete the{" "}
                          <Typography
                            variant="h7"
                            component="span"
                            display="inline"
                          >
                            <strong>{workout.title}</strong>
                          </Typography>{" "}
                          workout on <strong>{workout.date}</strong>?
                        </Typography>

                        <Container maxWidth="lg">
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                            sx={{ marginLeft: 0, width: 1 }}
                          >
                            <Grid item sm={4} sx={{ marginLeft: 7.5 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  deleteWorkout(workout._id);
                                }}
                              >
                                Delete
                              </Button>
                            </Grid>
                            <Grid item sm={4}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </Container>
                      </Box>
                    </Modal>
                  </Grid>
                ) : (
                  <Grid item sm={2} sx={{ marginLeft: 10, marginBottom: 2 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleOpen}
                    >
                      Subscribe
                    </Button>
                    <Modal open={open} onClose={handleClose}>
                      <Box sx={style}>
                        <Typography
                          sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
                          color="text.secondary"
                        >
                          Please confirm your subscribing to{" "}
                          <Typography
                            variant="h7"
                            component="span"
                            display="inline"
                          >
                            <strong>{workout.title}</strong>
                          </Typography>{" "}
                          workout on <strong>{workout.date}</strong>.
                        </Typography>
                        <Container maxWidth="lg">
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                            sx={{ marginLeft: 0, width: 1 }}
                          >
                            <Grid item sm={4} sx={{ marginLeft: 7.5 }}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={subscribeHandler}
                              >
                                Confirm
                              </Button>
                            </Grid>
                            <Grid item sm={4}>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </Container>
                      </Box>
                    </Modal>
                  </Grid>
                )}
              </Grid>
            </Container>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
//============ Component end ============

export default Workout;

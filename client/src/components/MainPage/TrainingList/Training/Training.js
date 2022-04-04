import React, { useState } from "react";
import "./Training.css";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

function Training({ training, deleteTraining }) {
  const { userContextState, userContextDispatch } = useUsersContext();

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }
  //=======Subscribe========Modal ** NOT DONE YET **=============

  async function subscribeHandler() {
    const response = await fetch("/api/schedules", {
      method: "POST",
      body: JSON.stringify({
        userID: getUserIdFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
        trainingID: training._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    userContextDispatch({
      type: Actions.updateScheduledTraining,
      payload: { ...data },
    });
  }
  //=========================Subscribe===========================

  //=======DELETE=====popper ** NEED TO CHANGE TO -  Modal **=====

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const popperClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  //===========================DELETE=========================

  return (
    <div className="Training">
      <Card sx={{ minWidth: 275, marginBottom: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {training.category}
          </Typography>
          <Typography variant="h5" component="div">
            {training.title}:
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Group size:
            {training.groupSize}
            <br />
            Duration:
            {training.duration}
          </Typography>
          <Typography variant="body2">{training.description}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trainer: NAME
          </Typography>
        </CardContent>
        <CardActions>
          <Container>
            <Grid container direction="row-reverse">
              {(function isAdmin() {
                if (
                  userContextState.username === "Admin" ||
                  userContextState.username === "admin" ||
                  localStorage.getItem("username") === "Admin" ||
                  localStorage.getItem("username") === "admin"
                ) {
                  return (
                    <Grid item sm={2} sx={{ marginLeft: 10, marginBottom: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={popperClickHandler}
                      >
                        Delete
                      </Button>
                      <Popper open={open} anchorEl={anchorEl}>
                        <Box
                          sx={{
                            border: 1,
                            p: 1,
                            bgcolor: "background.paper",
                          }}
                        >
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Are you sure that you want to delete the current
                            training?
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
                                  onClick={() => {
                                    deleteTraining(training._id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </Grid>
                              <Grid item sm={4}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={popperClickHandler}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </Container>
                        </Box>
                      </Popper>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item sm={2} sx={{ marginLeft: 10, marginBottom: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={subscribeHandler}
                      >
                        Subscribe
                      </Button>
                    </Grid>
                  );
                }
              })()}
            </Grid>
          </Container>
        </CardActions>
      </Card>
    </div>
  );
}

export default Training;

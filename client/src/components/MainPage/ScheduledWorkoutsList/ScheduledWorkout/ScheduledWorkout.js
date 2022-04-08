//============ Imports start ============
import React, { useState, useEffect } from "react";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
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
function ScheduledWorkout({
  scheduled,
  unsubscribeScheduledWorkout,
  userName,
}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <Container maxWidth="lg" sx={{ marginRight: 0 }}>
        <Card
          sx={{
            marginBottom: 1,
            marginLeft: 0,
            marginTop: 2,
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {scheduled.workoutInfo.category}
            </Typography>
            <Typography variant="h5" component="div">
              {scheduled.workoutInfo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              On <strong>{scheduled.workoutInfo.date}</strong>
              <br />
              {scheduled.workoutInfo.duration} minutes
              <br />
              {scheduled.workoutInfo.groupSize} people maximun
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <strong>Trainer:</strong> {scheduled.workoutInfo.trainerName}
              <br />
              <strong>_id:</strong> {scheduled._id}
              <br />
              <strong>userId:</strong> {scheduled.userID}
              <br />
              <strong>workoutID:</strong> {scheduled.workoutID}
            </Typography>
            {userName !== undefined ? (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <strong>Student:</strong> {userName.username}
                <br />
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <strong>Description: </strong>
                {scheduled.workoutInfo.description}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Container>
              <Grid container direction="row-reverse">
                <Grid item sm={2} sx={{ marginBottom: 2, marginRight: 5 }}>
                  <Button size="small" variant="contained" onClick={handleOpen}>
                    Unsubscribe
                  </Button>
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                      <Typography
                        sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
                        color="text.secondary"
                      >
                        Are you sure that you want to unsubscribe from{" "}
                        <Typography
                          variant="h7"
                          component="span"
                          display="inline"
                        >
                          <strong>{scheduled.workoutInfo.title}</strong>
                        </Typography>{" "}
                        workout on <strong>{scheduled.workoutInfo.date}</strong>
                        ?
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
                                unsubscribeScheduledWorkout(scheduled._id);
                              }}
                            >
                              Confirm
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
              </Grid>
            </Container>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
//============ Component end ============

export default ScheduledWorkout;

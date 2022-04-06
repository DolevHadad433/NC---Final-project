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
function ScheduledTraining({
  scheduled,
  unsubscribeScheduledTraining,
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
              {scheduled.trainingInfo.category}
            </Typography>
            <Typography variant="h5" component="div">
              {scheduled.trainingInfo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              On <strong>{scheduled.trainingInfo.date}</strong> at{" "}
              <strong>{scheduled.trainingInfo.timeInDay}</strong>
              <br />
              {scheduled.trainingInfo.duration} minutes
              <br />
              {scheduled.trainingInfo.groupSize} people maximun
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trainer: {scheduled.trainingInfo.trainerName}
            </Typography>
            {userName !== undefined ? (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Student: {userName.username}
              </Typography>
            ) : null}
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
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Are you sure that you want to unsubscribe from{" "}
                        <Typography
                          variant="h6"
                          component="span"
                          display="inline"
                        >
                          {scheduled.trainingInfo.title}
                        </Typography>{" "}
                        training on **ADD DATE**?
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
                                unsubscribeScheduledTraining(scheduled._id);
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

export default ScheduledTraining;

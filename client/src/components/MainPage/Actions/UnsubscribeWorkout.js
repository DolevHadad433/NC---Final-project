import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import RemoveIcon from '@mui/icons-material/Remove';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

function UnsubscribeWorkout({ scheduled, setUpdateScheduled }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function unsubscribeScheduledWorkout(_id) {
    const response = await fetch(`/api/schedules/${_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setUpdateScheduled(`Delete scheduled workout: ${_id}.`);
  }

  return (
    <div>
      <IconButton size="small" color="error" variant="contained" onClick={handleOpen}>
        <HighlightOffIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
            color="text.secondary"
          >
            Are you sure that you want to unsubscribe from{" "}
            <Typography variant="h7" component="span" display="inline">
              <strong>{scheduled.workoutInfo.title}</strong>
            </Typography>{" "}
            workout on <strong>{scheduled.workoutInfo.date}</strong>?
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
                  color="error"
                  onClick={() => {
                    unsubscribeScheduledWorkout(scheduled._id);
                  }}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button variant="contained" size="small" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

export default UnsubscribeWorkout;

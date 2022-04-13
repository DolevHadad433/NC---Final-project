import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

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

function DeleteWorkout({ workout, deleteWorkout }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
            color="text.secondary"
          >
            Are you sure that you want to delete the{" "}
            <Typography variant="h7" component="span" display="inline">
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
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteWorkout(workout._id);
                  }}
                  color="error"
                >
                  Delete
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

export default DeleteWorkout;

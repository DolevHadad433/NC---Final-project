import React, { useState } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import useDeleteWorkout from "../../../utils/useDeleteWorkout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";

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

function DeleteWorkout({ workout }) {
  const { setWorkoutsList, setScheduledForAdmin, setScheduledForUsers } =
    useWorkoutsContext();
  const deleteWorkoutHandler = useDeleteWorkout();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  function handleOpen() {
    setOpen(true);
  }

  function handleClose(id) {
    setOpen(false);
    setWorkoutsList(`Update the ${id} workout.`);
    setScheduledForAdmin(`Update the ${id} workout.`);
    setScheduledForUsers(`Update the ${id} workout.`);
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Delete workout</Typography>
      </Popover>
      <IconButton
        aria-owns={openPopover ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-label="delete"
        onClick={handleOpen}
      >
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
                    deleteWorkoutHandler(workout._id);
                    handleClose(workout._id);
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

import React, { useState } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import useDeleteWorkout from "../../../utils/useDeleteWorkout";
import useResponsive from "../../../utils/useResponsive";
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
  bgcolor: "green",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteWorkout({ workout }) {
  const { setWorkoutsList, setScheduledForAdmin, setScheduledForUsers } =
    useWorkoutsContext();
  const deleteWorkoutHandler = useDeleteWorkout();
  const {
    showInMobileOnly,
    showInDesktopToTabletVerticalOnly,
  } = useResponsive();

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
    <>
      <Container maxWidth={"xs"} sx={{ p: 0 }} style={showInMobileOnly}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <IconButton
              aria-owns={openPopover ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              aria-label="delete"
              onClick={handleOpen}
            >
              <DeleteIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose} style={showInMobileOnly}>
              <Container
                maxWidth="xs"
                sx={{
                  textAlign: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 300,
                  bgcolor: "white",
                  border: "2px solid #000",
                  boxShadow: 24,
                  paddingBottom: 4,
                  paddingTop: 2,
                }}
              >
                <Grid container rowSpacing={6}>
                  <Grid item xs={12}>
                    <Typography sx={{ width: "100%" }} color="text.secondary">
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
                  </Grid>
                  <Grid className="Buttons" item xs={12}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={8}>
                        <Button
                          size="small"
                          sx={{ width: "90%" }}
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

                      <Grid item xs={8}>
                        <Button
                          variant="contained"
                          sx={{ width: "90%" }}
                          size="small"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Modal>
          </Grid>
        </Grid>
      </Container>
      
      <Container
        maxWidth={"lg"}
        sx={{ p: 0 }}
        style={showInDesktopToTabletVerticalOnly}
      >
        <Grid container spacing={0}>
          <Grid item sm={12}>
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
            <Modal
              open={open}
              onClose={handleClose}
              style={showInDesktopToTabletVerticalOnly}
            >
              <Container
                maxWidth="lg"
                sx={{
                  textAlign: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 450,
                  bgcolor: "white",
                  border: "2px solid #000",
                  boxShadow: 24,
                  paddingBottom: 4,
                  paddingTop: 4,
                  paddingLeft: 2,
                  paddingRight: 4,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Typography sx={{ width: "100%" }} color="text.secondary">
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
                  </Grid>

                  <Grid className="Buttons" item sm={12}>
                    <Grid container spacing={1}>
                      <Grid item sm={6}>
                        <Button
                          sx={{ width: "70%" }}
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
                      <Grid item sm={6}>
                        <Button
                          sx={{ width: "70%" }}
                          variant="contained"
                          size="small"
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DeleteWorkout;

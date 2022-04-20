import React, { useState } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import useUnsubscribeWorkout from "../../../utils/useUnsubscribeWorkout";
import useResponsive from "../../../utils/useResponsive";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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

function UnsubscribeWorkout({ scheduled }) {
  const unsubscribeHandler = useUnsubscribeWorkout();
  const { setWorkoutsList, setScheduledForAdmin, setScheduledForUsers } =
    useWorkoutsContext();
  const {
    showInMobileOnly,
    showInTabletOnly,
    showInTabletVerticalOnly,
    showInTabletHorizontalOnly,
    showInTabletVerticalAndBelow,
    showInTabletHorizontalAndBelow,
    showInLaptopOnly,
    showInLaptopAndBelow,
    showInLaptopToTabletVertical,
    showInLaptopToTabletHorizontalOnly,
    showInDesktopToTabletVerticalOnly,
    showInDesktopToTabletHorizontalOnly,
    showInDesktopToLaptopOnly,
    showInDesktopOnly,
    showInAllWidth,
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
  console.log("Unubscribe action render");
  return (
    <>
      <Container maxWidth={"xs"} sx={{ p: 0 }} style={showInMobileOnly}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <IconButton
              aria-owns={openPopover ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              size="small"
              color="error"
              variant="contained"
              onClick={handleOpen}
            >
              <HighlightOffIcon />
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
                      Are you sure that you want to unsubscribe from{" "}
                      <Typography
                        variant="h7"
                        component="span"
                        display="inline"
                      >
                        <strong>{scheduled.workoutInfo.title}</strong>
                      </Typography>{" "}
                      workout on <strong>{scheduled.workoutInfo.date}</strong>?
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
                          sx={{ width: "90%" }}
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => {
                            unsubscribeHandler(scheduled._id);
                            handleClose(scheduled._id);
                          }}
                        >
                          Confirm
                        </Button>
                      </Grid>

                      <Grid item xs={8}>
                        <Button
                          sx={{ width: "90%" }}
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
              <Typography sx={{ p: 1 }}>Unsubscribe workout</Typography>
            </Popover>
            <IconButton
              aria-owns={openPopover ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              size="small"
              color="error"
              variant="contained"
              onClick={handleOpen}
            >
              <HighlightOffIcon />
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
                      Are you sure that you want to unsubscribe from{" "}
                      <Typography
                        variant="h7"
                        component="span"
                        display="inline"
                      >
                        <strong>{scheduled.workoutInfo.title}</strong>
                      </Typography>{" "}
                      workout on <strong>{scheduled.workoutInfo.date}</strong>?
                    </Typography>
                  </Grid>
                  <Grid className="Buttons" item sm={12}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item sm={6}>
                        <Button
                          sx={{ width: "70%" }}
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => {
                            unsubscribeHandler(scheduled._id);
                            handleClose(scheduled._id);
                          }}
                        >
                          Confirm
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

export default UnsubscribeWorkout;

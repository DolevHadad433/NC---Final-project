//============ Imports start ============
import React, { useReducer } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import useResponsive from "../../../utils/useResponsive";
import { v4 as uuid } from "uuid";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Box,
  AppBar,
  Modal,
  Link,
} from "@mui/material";
import moment from "moment";
import { width } from "@mui/system";
import { MobileDateTimePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EventIcon from "@mui/icons-material/Event";

//============ Imports end ============

//============ Reducer properties start ============
function addingWorkoutReducer(state, action) {
  switch (action.type) {
    case "trying-add-Workout":
      return {
        ...state,
        isLoading: true,
        error: "",
        addWorkoutSuccessfully: false,
      };
    case "error":
      return {
        ...state,
        error: "Fill the form correctly",
      };
    case "stop-loading":
      return {
        ...state,
        isLoading: false,
      };
    case "add-successfully":
      return {
        ...state,
        addWorkoutSuccessfully: true,
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "add-another":
      return {
        ...state,
        addWorkoutSuccessfully: false,
      };
    case "input-value":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      break;
  }
  return state;
}
const initialAddingWorkoutState = {
  title: "",
  category: "",
  duration: "",
  groupSize: "",
  date: moment(),
  timeInDay: "",
  trainerName: "",
  isLoading: false,
  error: "",
  addWorkoutSuccessfully: false,
  categoryValue: "",
  categoryInputValue: "",
  workoutTitleValue: "",
  workoutTitleInputValue: "",
  workoutDurationValue: "",
  workoutDurationInputValue: "",
  workoutGroupSizeValue: "",
  workoutGroupSizeInputValue: "",
  workoutTrainerNameValue: "",
  workoutTrainerNameInputValue: "",
};
//============ Reducer properties end ============

//============ Component start ============
function AddingWorkout({ setOpen, handleMenuClose, open }) {
  const [addingWorkoutState, dispatchAddingWorkout] = useReducer(
    addingWorkoutReducer,
    initialAddingWorkoutState
  );

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

  const { workoutsList, workoutBaseList, categoriesList, setWorkoutsList } =
    useWorkoutsContext();

  function handleClose() {
    setOpen(false);
  }

  function handleAddNewWorkOutModalClose(id) {
    setOpen(false);
    setWorkoutsList(`Update the ${id} workout.`);
  }

  const workoutsOptions = {
    categoryTitle: categoriesList.map((e) => e.title),
    workoutTitle: workoutBaseList.map((e) => e.title),
    workoutDuration: workoutsList
      .map((e) => e.duration)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutGroupSize: workoutsList
      .map((e) => e.groupSize)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutTrainerName: workoutsList
      .map((e) => e.trainerName)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
  };

  function filterDescription() {
    const findDescription = workoutBaseList.find(
      (e) => e.title === addingWorkoutState.title
    );
    return findDescription.description;
  }

  async function onSubmitAddingWorkoutForm(e) {
    e.preventDefault();

    dispatchAddingWorkout({ type: "trying-add-workout" });

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify({
          title: addingWorkoutState.title,
          category: addingWorkoutState.category,
          duration: addingWorkoutState.duration,
          groupSize: addingWorkoutState.groupSize,
          dayInWeek: moment(addingWorkoutState.date).format("dddd"),
          dayInMonth: moment(addingWorkoutState.date).format("MMM Do"),
          time: moment(addingWorkoutState.date).format("kk:mm[ ]A"),
          weekOfYear: moment(addingWorkoutState.date).format("w"),
          trainerName: addingWorkoutState.trainerName,
          description: filterDescription(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setTimeout(() => {
        dispatchAddingWorkout({ type: "stop-loading" });
        dispatchAddingWorkout({ type: "add-successfully" });
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatchAddingWorkout({ type: "error" });
        dispatchAddingWorkout({ type: "stop_loading" });
      }, 1000);
    }
  }

  if (addingWorkoutState.addWorkoutSuccessfully) {
    return (
      <>
        <Modal open={open} style={showInDesktopToTabletHorizontalOnly}>
          <Container
            className="show-in-Horizontal-Tablet"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 4,
              paddingTop: 2,
            }}
            maxWidth={"lg"}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 1, width: "100%" }}
            >
              <Grid className="title-of-page" item sm={12}>
                <Typography color="text.secondary" variant="h4" component="div">
                  Workout added successfully!
                </Typography>
              </Grid>
              <Grid className="Buttons" item sm={10}>
                <Grid container spacing={4}>
                  <Grid className="btn-cancel" item sm={6}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      size={"large"}
                      onClick={() => {
                        handleAddNewWorkOutModalClose(uuid());
                        return handleMenuClose !== undefined
                          ? handleMenuClose()
                          : null;
                      }}
                    >
                      Back to main page
                    </Button>
                  </Grid>
                  <Grid className="btn-submit" item sm={6}>
                    <Button
                      variant="contained"
                      sx={{ width: "100%" }}
                      size={"large"}
                      onClick={() =>
                        dispatchAddingWorkout({ type: "add-another" })
                      }
                    >
                      Add another workout!
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Modal>
        <Modal open={open} style={showInTabletVerticalOnly}>
          <Container
            className="show-in-Vertical-Tablet"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 550,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 4,
              paddingTop: 2,
            }}
            maxWidth={"sm"}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 1, width: "100%" }}
            >
              <Grid className="title-of-page" item sm={12}>
                <Typography color="text.secondary" variant="h5" component="div">
                  Workout added successfully!
                </Typography>
              </Grid>

              <Grid className="Buttons" item sm={10}>
                <Grid container spacing={2}>
                  <Grid className="btn-add-another" item sm={12}>
                    <Button
                      variant="contained"
                      size={"large"}
                      sx={{ width: "60%" }}
                      onClick={() =>
                        dispatchAddingWorkout({ type: "add-another" })
                      }
                    >
                      Add another workout!
                    </Button>
                  </Grid>
                  <Grid className="btn-back" item sm={12}>
                    <Button
                      variant="outlined"
                      size={"large"}
                      sx={{ width: "60%" }}
                      onClick={() => {
                        handleAddNewWorkOutModalClose(uuid());
                        return handleMenuClose !== undefined
                          ? handleMenuClose()
                          : null;
                      }}
                    >
                      Back to main page
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Modal>
        <Modal open={open} style={showInMobileOnly}>
          <Container
            className="show-in-mobile"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 330,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 4,
              paddingTop: 2,
            }}
            maxWidth={"xs"}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 1, width: "100%" }}
            >
              <Grid className="title-of-page" item sm={12}>
                <Typography color="text.secondary" variant="h6" component="div">
                  Workout added successfully!
                </Typography>
              </Grid>
              <Grid className="Buttons" item xs={10}>
                <Grid container spacing={1}>
                  <Grid className="btn-add-another" item xs={12}>
                    <Button
                      variant="contained"
                      sx={{ width: "90%" }}
                      size={"small"}
                      onClick={() =>
                        dispatchAddingWorkout({ type: "add-another" })
                      }
                    >
                      Add another workout!
                    </Button>
                  </Grid>
                  <Grid className="btn-back" item xs={12}>
                    <Button
                      variant="outlined"
                      sx={{ width: "90%" }}
                      size={"small"}
                      onClick={() => {
                        handleAddNewWorkOutModalClose(uuid());
                        return handleMenuClose !== undefined
                          ? handleMenuClose()
                          : null;
                      }}
                    >
                      Back to main page
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal open={open} style={showInDesktopToTabletHorizontalOnly}>
          <Container
            className="show-in-Horizontal-Tablet"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 4,
              paddingTop: 2,
            }}
            maxWidth={"lg"}
          >
            <form onSubmit={onSubmitAddingWorkoutForm}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                rowSpacing={3}
                sx={{ marginTop: 1, width: "100%" }}
              >
                <Grid className="title-of-page" item sm={12}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="div"
                  >
                    Please enter workout details:
                  </Typography>
                </Grid>
                <Grid className="title" item sm={11}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTitleValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTitleInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTitleInputValue",
                        value: newInputValue,
                      });
                    }}
                    id="workout-title-auto-complete"
                    options={workoutsOptions.workoutTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout title" />
                    )}
                  />
                </Grid>
                <Grid className="category" item sm={11}>
                  <Autocomplete
                    value={addingWorkoutState.categoryValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.categoryInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "categoryInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newInputValue,
                      });
                    }}
                    id="category-auto-complete"
                    options={workoutsOptions.categoryTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </Grid>
                <Grid className="duration" item sm={11}>
                  <Autocomplete
                    value={addingWorkoutState.workoutDurationValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutDurationInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutDurationInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newInputValue,
                      });
                    }}
                    id="workout-duration-auto-complete"
                    options={workoutsOptions.workoutDuration}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Workout duration in minutes"
                      />
                    )}
                  />
                </Grid>
                <Grid className="Group-size" item sm={11}>
                  <Autocomplete
                    value={addingWorkoutState.workoutGroupSizeValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutGroupSizeInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutGroupSizeInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newInputValue,
                      });
                    }}
                    id="workout-group-size-auto-complete"
                    options={workoutsOptions.workoutGroupSize}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout group size" />
                    )}
                  />
                </Grid>
                <Grid className="date" item sm={10}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="Date"
                      required
                      clearable
                      showTodayButton
                      disableIgnoringDatePartForTimeValidation
                      minDate={moment()}
                      minTime={moment(addingWorkoutState.date).hour(8)}
                      maxTime={moment(addingWorkoutState.date).hour(21)}
                      minutesStep={5}
                      value={addingWorkoutState.date}
                      inputFormat="DD/MM/yyyy ,  HH:mm"
                      onChange={(newValue) => {
                        dispatchAddingWorkout({
                          type: "field",
                          field: "date",
                          value: newValue,
                        });
                      }}
                      renderInput={(props) => (
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          {...props}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid className="Trainer's-name" item sm={11}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTrainerNameValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTrainerNameInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTrainerNameInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newInputValue,
                      });
                    }}
                    id="workout-trainer's-name-auto-complete"
                    options={workoutsOptions.workoutTrainerName}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trainer's name" />
                    )}
                  />
                </Grid>
                <Grid className="Buttons" item sm={10}>
                  <Grid container spacing={2}>
                    <Grid className="btn-cancel" item sm={6}>
                      <Button
                        variant="outlined"
                        sx={{ width: "70%" }}
                        size={"large"}
                        onClick={() => {
                          if (handleMenuClose !== undefined) {
                            handleMenuClose();
                            return handleClose();
                          } else {
                            handleClose();
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid className="btn-submit" item sm={6}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "70%" }}
                        size={"large"}
                        disabled={addingWorkoutState.isLoading}
                      >
                        {addingWorkoutState.isLoading
                          ? "Adding workout..."
                          : "Add workout"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Modal>
        <Modal open={open} style={showInTabletVerticalOnly}>
          <Container
            className="show-in-Vertical-Tablet"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 550,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 4,
              paddingTop: 2,
            }}
            maxWidth={"sm"}
          >
            <form onSubmit={onSubmitAddingWorkoutForm}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnSpacing={1}
                rowSpacing={2}
                sx={{ marginTop: 1, width: "100%" }}
              >
                <Grid className="title-of-page" item sm={12}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="div"
                  >
                    Please enter workout details:
                  </Typography>
                </Grid>
                <Grid className="title" item sm={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTitleValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTitleInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTitleInputValue",
                        value: newInputValue,
                      });
                    }}
                    id="workout-title-auto-complete"
                    options={workoutsOptions.workoutTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout title" />
                    )}
                  />
                </Grid>
                <Grid className="category" item sm={10}>
                  <Autocomplete
                    value={addingWorkoutState.categoryValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.categoryInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "categoryInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newInputValue,
                      });
                    }}
                    id="category-auto-complete"
                    options={workoutsOptions.categoryTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </Grid>
                <Grid className="duration" item sm={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutDurationValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutDurationInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutDurationInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newInputValue,
                      });
                    }}
                    id="workout-duration-auto-complete"
                    options={workoutsOptions.workoutDuration}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Workout duration in minutes"
                      />
                    )}
                  />
                </Grid>
                <Grid className="Group-size" item sm={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutGroupSizeValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutGroupSizeInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutGroupSizeInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newInputValue,
                      });
                    }}
                    id="workout-group-size-auto-complete"
                    options={workoutsOptions.workoutGroupSize}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout group size" />
                    )}
                  />
                </Grid>
                <Grid className="date" item sm={10}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="Date"
                      required
                      clearable
                      showTodayButton
                      disableIgnoringDatePartForTimeValidation
                      minDate={moment()}
                      minTime={moment(addingWorkoutState.date).hour(8)}
                      maxTime={moment(addingWorkoutState.date).hour(21)}
                      minutesStep={5}
                      value={addingWorkoutState.date}
                      inputFormat="DD/MM/yyyy ,  HH:mm"
                      onChange={(newValue) => {
                        dispatchAddingWorkout({
                          type: "field",
                          field: "date",
                          value: newValue,
                        });
                      }}
                      renderInput={(props) => (
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          {...props}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid className="Trainer's-name" item sm={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTrainerNameValue}
                    required
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTrainerNameInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTrainerNameInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newInputValue,
                      });
                    }}
                    id="workout-trainer's-name-auto-complete"
                    options={workoutsOptions.workoutTrainerName}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trainer's name" />
                    )}
                  />
                </Grid>
                <Grid className="Buttons" item sm={10}>
                  <Grid container spacing={2}>
                    <Grid className="btn-cancel" item sm={6}>
                      <Button
                        variant="outlined"
                        sx={{ width: "80%" }}
                        onClick={() => {
                          if (handleMenuClose !== undefined) {
                            handleMenuClose();
                            return handleClose();
                          } else {
                            handleClose();
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid className="btn-submit" item sm={6}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "80%" }}
                        disabled={addingWorkoutState.isLoading}
                      >
                        {addingWorkoutState.isLoading
                          ? "Adding workout..."
                          : "Add workout"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Modal>
        <Modal open={open} style={showInMobileOnly}>
          <Container
            className="show-in-mobile"
            sx={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 330,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              paddingBottom: 2,
              paddingTop: 1,
            }}
            maxWidth={"xs"}
          >
            <form onSubmit={onSubmitAddingWorkoutForm}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                rowSpacing={2}
                sx={{ width: "100%" }}
              >
                <Grid className="title-of-page" item sm={12}>
                  <Typography
                    color="text.secondary"
                    variant="h6"
                    component="div"
                  >
                    Please enter workout details:
                  </Typography>
                </Grid>
                <Grid className="title" item xs={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTitleValue}
                    required
                    size={"small"}
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTitleInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "title",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTitleInputValue",
                        value: newInputValue,
                      });
                    }}
                    id="workout-title-auto-complete"
                    options={workoutsOptions.workoutTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout title" />
                    )}
                  />
                </Grid>
                <Grid className="category" item xs={10}>
                  <Autocomplete
                    value={addingWorkoutState.categoryValue}
                    required
                    size={"small"}
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.categoryInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "categoryInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "category",
                        value: newInputValue,
                      });
                    }}
                    id="category-auto-complete"
                    options={workoutsOptions.categoryTitle}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                </Grid>
                <Grid className="duration" item xs={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutDurationValue}
                    required
                    size={"small"}
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutDurationInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutDurationInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "duration",
                        value: newInputValue,
                      });
                    }}
                    id="workout-duration-auto-complete"
                    options={workoutsOptions.workoutDuration}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Workout duration in minutes"
                      />
                    )}
                  />
                </Grid>
                <Grid className="Group-size" item xs={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutGroupSizeValue}
                    required
                    size={"small"}
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutGroupSizeInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutGroupSizeInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "groupSize",
                        value: newInputValue,
                      });
                    }}
                    id="workout-group-size-auto-complete"
                    options={workoutsOptions.workoutGroupSize}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Workout group size" />
                    )}
                  />
                </Grid>
                <Grid className="date" item xs={10}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDateTimePicker
                      label="Date"
                      required
                      clearable
                      showTodayButton
                      disableIgnoringDatePartForTimeValidation
                      minDate={moment()}
                      minTime={moment(addingWorkoutState.date).hour(8)}
                      maxTime={moment(addingWorkoutState.date).hour(21)}
                      minutesStep={5}
                      value={addingWorkoutState.date}
                      inputFormat="DD/MM/yyyy ,  HH:mm"
                      onChange={(newValue) => {
                        dispatchAddingWorkout({
                          type: "field",
                          field: "date",
                          value: newValue,
                        });
                      }}
                      renderInput={(props) => (
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          {...props}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid className="Trainer's-name" item xs={10}>
                  <Autocomplete
                    value={addingWorkoutState.workoutTrainerNameValue}
                    required
                    size={"small"}
                    freeSolo
                    onChange={(event, newValue) => {
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newValue,
                      });
                    }}
                    inputValue={addingWorkoutState.workoutTrainerNameInputValue}
                    onInputChange={(event, newInputValue) => {
                      dispatchAddingWorkout({
                        type: "input-value",
                        field: "workoutTrainerNameInputValue",
                        value: newInputValue,
                      });
                      dispatchAddingWorkout({
                        type: "field",
                        field: "trainerName",
                        value: newInputValue,
                      });
                    }}
                    id="workout-trainer's-name-auto-complete"
                    options={workoutsOptions.workoutTrainerName}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trainer's name" />
                    )}
                  />
                </Grid>
                <Grid className="Buttons" item xs={10}>
                  <Grid container rowSpacing={1}>
                    <Grid className="btn-submit" item xs={12}>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "90%" }}
                        size={"small"}
                        disabled={addingWorkoutState.isLoading}
                      >
                        {addingWorkoutState.isLoading
                          ? "Adding workout..."
                          : "Add workout!"}
                      </Button>
                    </Grid>
                    <Grid className="btn-cancel" item xs={12}>
                      <Button
                        variant="outlined"
                        sx={{ width: "90%" }}
                        size={"small"}
                        onClick={() => {
                          if (handleMenuClose !== undefined) {
                            handleMenuClose();
                            return handleClose();
                          } else {
                            handleClose();
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Modal>
      </>
    );
  }
}
// }
//============ Component end ============

export default AddingWorkout;

{
  /* <TextField
                    required
                    size={"small"}
                    id="datetime-local"
                    type="datetime-local"
                    sx={{ width: "100%" }}
                    value={addingWorkoutState.date}
                    onChange={(e) =>
                      dispatchAddingWorkout({
                        type: "field",
                        field: "date",
                        value: e.currentTarget.value,
                      })
                    }
                  >
                    <Link href="#" underline="hover" >
                      close
                    </Link>
                  </TextField> */
}

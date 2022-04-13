//============ Imports start ============
import React, { useReducer, useState, useEffect } from "react";
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
} from "@mui/material";
import moment from "moment";
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
  date: "",
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
function AddingWorkout({
  handleClose,
  updateWorkout,
  setUpdateWorkout,
  workoutBaseList,
}) {
  const [addingWorkoutState, dispatchAddingWorkout] = useReducer(
    addingWorkoutReducer,
    initialAddingWorkoutState
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  // const [workoutBaseList, setWorkoutBaseList] = useState([]);
  const workoutsOptions = {
    categoryTitle: categoriesList.map((e) => e.title),
    workoutTitle: workoutBaseList.map((e) => e.title),
    workoutDuration: workoutList
      .map((e) => e.duration)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutGroupSize: workoutList
      .map((e) => e.groupSize)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutTrainerName: workoutList
      .map((e) => e.trainerName)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
  };

  useEffect(() => {
    fetch("/api/categories/")
      .then((responseCategories) => responseCategories.json())
      .then((dataCategories) => setCategoriesList([...dataCategories]));
  }, []);

  useEffect(() => {
    fetch("/api/workouts/")
      .then((responseWorkouts) => responseWorkouts.json())
      .then((dataWorkouts) => setWorkoutList([...dataWorkouts]));
  }, []);

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
      const data = await response.json();
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
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: 1, width: 550 }}
        >
          <div className="successfully-add-workout-container">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 2, width: "50ch" },
              }}
            >
              <Grid item>
                <Typography variant="h4" component="div">
                  Workout added successfully!
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 3 }}
                  onClick={() => dispatchAddingWorkout({ type: "add-another" })}
                >
                  Add another workout!
                </Button>

                <Button
                  variant="outlined"
                  sx={{ mt: 3, ml: 3 }}
                  onClick={() => handleClose(uuid())}
                >
                  Back to main page
                </Button>
              </Grid>
            </Box>
          </div>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container sx={{ textAlign: "center" }}>
        <form onSubmit={onSubmitAddingWorkoutForm}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 1, width: 600 }}
          >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 2, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Grid className="title-of-page" item sm={6}>
                <AppBar
                  position="static"
                  sx={{
                    textAlign: "center",
                    width: 450,
                    borderRadius: 1,
                    marginBottom: 4,
                    marginLeft: 5,
                  }}
                >
                  <Typography variant="h5" component="div">
                    Please enter workout details:
                  </Typography>
                </AppBar>
              </Grid>
              <Grid className="title" item sm={6}>
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
                      type: "input-value",
                      field: "workoutTitleInputValue",
                      value: newInputValue,
                    });
                    dispatchAddingWorkout({
                      type: "field",
                      field: "title",
                      value: newInputValue,
                    });
                  }}
                  id="workout-title-auto-complete"
                  options={workoutsOptions.workoutTitle}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Workout title" />
                  )}
                />
              </Grid>
              <Grid className="category" item sm={6}>
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
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </Grid>
              <Grid className="duration" item sm={6}>
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
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Workout duration in minutes"
                    />
                  )}
                />
              </Grid>
              <Grid className="Group-size" item sm={6}>
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
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Workout group size" />
                  )}
                />
              </Grid>
              <Grid className="date" item sm={6}>
                <TextField
                  required
                  id="datetime-local"
                  type="datetime-local"
                  sx={{ width: 250 }}
                  value={addingWorkoutState.date}
                  onChange={(e) =>
                    dispatchAddingWorkout({
                      type: "field",
                      field: "date",
                      value: e.currentTarget.value,
                    })
                  }
                />
              </Grid>
              <Grid className="Trainer's-name" item sm={6}>
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
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Trainer's name" />
                  )}
                />
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid className="btn-cancel" item sm={6}>
                    <Button
                      variant="outlined"
                      sx={{ mt: 3, ml: 1 }}
                      onClick={() => handleClose(uuid())}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid className="btn-submit" item sm={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 3, ml: 1 }}
                      disabled={addingWorkoutState.isLoading}
                    >
                      {addingWorkoutState.isLoading
                        ? "Adding workout..."
                        : "Add workout"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Container>
    );
  }
}
// }
//============ Component end ============

export default AddingWorkout;

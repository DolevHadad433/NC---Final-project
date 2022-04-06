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
  Stack,
} from "@mui/material";
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
  workoutTimeInDayValue: "",
  workoutTimeInDayInputValue: "",
};
//============ Reducer properties end ============

//============ Component start ============
function AddingWorkout({ handleClose, updateWorkout, setUpdateWorkout }) {
  const [addingWorkoutState, dispatchAddingWorkout] = useReducer(
    addingWorkoutReducer,
    initialAddingWorkoutState
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const workoutsOptions = {
    categoryTitle: categoriesList.map((e) => e.title),
    workoutTitle: workoutList.map((e) => e.title),
    workoutDuration: workoutList
      .map((e) => e.duration)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutGroupSize: workoutList
      .map((e) => e.groupSize)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutTrainerName: workoutList
      .map((e) => e.trainerName)
      .filter((e, index, self) => index === self.findIndex((t) => t === e)),
    workoutTimeInDay: Array.from(new Array(15)).map(
      (_, index) => `${index < 2 ? "0" : ""}${Math.floor(index + 8)}:00`
    ),
  };

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList([...data]));
  }, []);

  useEffect(() => {
    fetch("/api/workouts/")
      .then((response) => response.json())
      .then((data) => setWorkoutList([...data]));
  }, []);

  async function onSubmitAddingWorkoutForm(e) {
    e.preventDefault();

    dispatchAddingWorkout({ type: "trying-add-workout" });

    try {
      await fetch("/api/workout", {
        method: "POST",
        body: JSON.stringify({
          title: addingWorkoutState.title,
          category: addingWorkoutState.category,
          duration: addingWorkoutState.duration,
          groupSize: addingWorkoutState.groupSize,
          date: addingWorkoutState.date,
          trainerName: addingWorkoutState.trainerName,
          timeInDay: addingWorkoutState.timeInDay,
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
      <Container>
        <Grid container>
          <div className="successfully-add-workout-container">
            <Grid item>
              <Typography variant="h4" component="div">
                Please enter workout details:
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => dispatchAddingWorkout({ type: "add-another" })}
              >
                Add another workout!
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => handleClose(uuid())}
              >
                Back to main page
              </Button>
            </Grid>
          </div>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container sx={{ textAlign: "center" }}>
        <form onSubmit={onSubmitAddingWorkoutForm}>
          <Typography variant="h4" component="div">
            Please enter workout details:
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 1, width: 600 }}
          >
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
                  <TextField {...params} label="Workout duration in minutes" />
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
                id="outlined-required"
                type="date"
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
              <Autocomplete
                value={addingWorkoutState.workoutTimeInDayValue}
                id="time-in-day"
                freeSolo
                options={workoutsOptions.workoutTimeInDay}
                getOptionDisabled={(option) =>
                  option === workoutsOptions.workoutTimeInDay[0] ||
                  option === workoutsOptions.workoutTimeInDay[2]
                }
                onChange={(event, newValue) => {
                  dispatchAddingWorkout({
                    type: "field",
                    field: "timeInDay",
                    value: newValue,
                  });
                }}
                inputValue={addingWorkoutState.workoutTimeInDayInputValue}
                onInputChange={(event, newInputValue) => {
                  dispatchAddingWorkout({
                    type: "input-value",
                    field: "workoutTimeInDayInputValue",
                    value: newInputValue,
                  });
                  dispatchAddingWorkout({
                    type: "field",
                    field: "timeInDay",
                    value: newInputValue,
                  });
                }}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Time in day" />
                )}
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
            <Grid className="btn-cancel" item sm={3}>
              <Button
                variant="outlined"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => handleClose(uuid())}
              >
                Cancel
              </Button>
            </Grid>
            <Grid className="btn-submit" item sm={4}>
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
        </form>
      </Container>
    );
  }
}
// }
//============ Component end ============

export default AddingWorkout;

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
function addingTrainingReducer(state, action) {
  switch (action.type) {
    case "trying-add-training":
      return {
        ...state,
        isLoading: true,
        error: "",
        addTraingingSuccessfully: false,
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
        addTraingingSuccessfully: true,
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "add-another":
      return {
        ...state,
        addTraingingSuccessfully: false,
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
const initialAddingTrainingState = {
  title: "",
  category: "",
  duration: "",
  groupSize: "",
  date: "",
  trainer: "",
  isLoading: false,
  error: "",
  addTraingingSuccessfully: false,
  categoryValue: "",
  categoryInputValue: "",
  trainingTitleValue: "",
  trainingTitleInputValue: "",
  trainingDurationValue: "",
  trainingDurationInputValue: "",
};
//============ Reducer properties end ============

//============ Component start ============
function AddingTraining({ handleClose, updateTraining, setUpdateTraining }) {
  const [addingTrainingState, dispatchAddingTraining] = useReducer(
    addingTrainingReducer,
    initialAddingTrainingState
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const [trainingList, setTrainingList] = useState([]);
  const workoutsOptions = {
    categoryTitle: categoriesList.map((e) => e.title),
    trainingTitle: trainingList.map((e) => e.title),
    trainingDuration: (function removeDuplicateDuration() {
      const uniqueDuration = [];
      trainingList
        .map((e) => e.duration)
        .filter((e) => {
          return uniqueDuration.find((c) => c === e) === undefined;
        });
      return uniqueDuration;
    })(),
  };

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList([...data]));
  }, []);

  useEffect(() => {
    fetch("/api/training/")
      .then((response) => response.json())
      .then((data) => setTrainingList([...data]));
  }, []);

  async function onSubmitAddingTrainingForm(e) {
    e.preventDefault();

    dispatchAddingTraining({ type: "trying-add-training" });

    try {
      await fetch("/api/training", {
        method: "POST",
        body: JSON.stringify({
          title: addingTrainingState.title,
          category: addingTrainingState.category,
          duration: addingTrainingState.duration,
          groupSize: addingTrainingState.groupSize,
          date: addingTrainingState.date,
          trainer: addingTrainingState.trainer,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setTimeout(() => {
        dispatchAddingTraining({ type: "stop-loading" });
        dispatchAddingTraining({ type: "add-successfully" });
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        dispatchAddingTraining({ type: "error" });
        dispatchAddingTraining({ type: "stop_loading" });
      }, 1000);
    }
  }

  if (addingTrainingState.addTraingingSuccessfully) {
    return (
      <Container>
        <Grid container>
          <div className="successfully-add-training-container">
            <Grid item>
              <Typography variant="h4" component="div">
                Please enter training details:
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => dispatchAddingTraining({ type: "add-another" })}
              >
                Add another training!
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
        <form onSubmit={onSubmitAddingTrainingForm}>
          <Typography variant="h4" component="div">
            Please enter training details:
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
                value={addingTrainingState.trainingTitleValue}
                required
                freeSolo
                onChange={(event, newValue) => {
                  dispatchAddingTraining({
                    type: "field",
                    field: "title",
                    value: newValue,
                  });
                }}
                inputValue={addingTrainingState.trainingTitleInputValue}
                onInputChange={(event, newInputValue) => {
                  dispatchAddingTraining({
                    type: "input-value",
                    field: "trainingTitleInputValue",
                    value: newInputValue,
                  });
                  dispatchAddingTraining({
                    type: "field",
                    field: "title",
                    value: newInputValue,
                  });
                }}
                id="training-title-auto-complete"
                options={workoutsOptions.trainingTitle}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Training title" />
                )}
              />
            </Grid>
            <Grid className="category" item sm={6}>
              <Autocomplete
                value={addingTrainingState.categoryValue}
                required
                freeSolo
                onChange={(event, newValue) => {
                  dispatchAddingTraining({
                    type: "field",
                    field: "category",
                    value: newValue,
                  });
                }}
                inputValue={addingTrainingState.categoryInputValue}
                onInputChange={(event, newInputValue) => {
                  dispatchAddingTraining({
                    type: "input-value",
                    field: "categoryInputValue",
                    value: newInputValue,
                  });
                  dispatchAddingTraining({
                    type: "field",
                    field: "category",
                    value: newInputValue,
                  });
                }}
                id="category-auto-complete"
                options={workoutsOptions.categoryTitle}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid className="duration" item sm={6}>
              <Autocomplete
                value={addingTrainingState.trainingDurationValue}
                required
                freeSolo
                onChange={(event, newValue) => {
                  dispatchAddingTraining({
                    type: "field",
                    field: "duration",
                    value: newValue,
                  });
                }}
                inputValue={addingTrainingState.trainingDurationInputValue}
                onInputChange={(event, newInputValue) => {
                  dispatchAddingTraining({
                    type: "input-value",
                    field: "trainingDurationInputValue",
                    value: newInputValue,
                  });
                  dispatchAddingTraining({
                    type: "field",
                    field: "duration",
                    value: newInputValue,
                  });
                }}
                id="training-duration-auto-complete"
                options={workoutsOptions.trainingDuration}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Training duration" />
                )}
              />
            </Grid>
            <Grid className="Group-size" item sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Group size"
                value={addingTrainingState.groupSize}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "groupSize",
                    value: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid className="date" item sm={6}>
              <TextField
                required
                id="outlined-required"
                type="date"
                value={addingTrainingState.date}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "date",
                    value: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid className="Trainer's-name" item sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Trainer's name"
                value={addingTrainingState.trainer}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "trainer",
                    value: e.currentTarget.value,
                  })
                }
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
                disabled={addingTrainingState.isLoading}
              >
                {addingTrainingState.isLoading
                  ? "Adding training..."
                  : "Add training"}
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

export default AddingTraining;

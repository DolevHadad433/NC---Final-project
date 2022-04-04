//============ Imports start ============
import React, { useReducer, useState } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import { Button, Container, Grid, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
//============ Imports end ============

//============ Reducer properties start ============
function addingTrainingReducer(state, action) {
  switch (action.type) {
    case "trying-add-training":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "error":
      return {
        ...state,
        error: "Fill the form correctly",
      };
    case "stop_loading":
      return {
        ...state,
        isLoading: false,
        addTraingingSuccessfully: false,
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
};
//============ Reducer properties end ============

//============ Component start ============
function AddingTraining() {
  const [addingTrainingState, dispatchAddingTraining] = useReducer(
    addingTrainingReducer,
    initialAddingTrainingState
  );
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const clickSubmitAddingTrainingHandler = useNavigate();
  const clickCancelAddingTrainingHandler = useNavigate();
  const { userContextState, userContextDispatch } = useUsersContext();

  function handleChange(newValue) {
    setValue(newValue);
  }

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
      dispatchAddingTraining({ type: "add-successfully" });
      setTimeout(() => {
        try {
          dispatchAddingTraining({ type: "stop_loading" });
          clickCancelAddingTrainingHandler("/main-page");
        } catch {
          addingAnotherTrainingHandler();
        }
      }, 5000);
    } catch (error) {
      setTimeout(() => {
        dispatchAddingTraining({ type: "error" });
        dispatchAddingTraining({ type: "stop_loading" });
      }, 1000);
    }
  }

  function addingAnotherTrainingHandler() {
    dispatchAddingTraining({ type: "stop_loading" });
  }

  function cancelAddingTrainingFormHandler() {
    clickCancelAddingTrainingHandler("/main-page");
  }

  if (addingTrainingState.addTraingingSuccessfully) {
    return (
      <Container>
        <Grid container>
          <div className="successfully-add-training-container">
            <Grid item>
              <h1 className="successfully-add-training-title">
                The training was successfully added to the page!
              </h1>
              <h3 className="message">
                Click one of the buttons or you will be redirected back to the
                main page
              </h3>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={addingAnotherTrainingHandler}
              >
                Add another training!
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={cancelAddingTrainingFormHandler}
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
          <p>Please enter training details</p>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 1, width: 600 }}
          >
            <Grid item sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Training title"
                value={addingTrainingState.title}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "title",
                    value: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Category"
                value={addingTrainingState.category}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "category",
                    value: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Duration"
                value={addingTrainingState.duration}
                onChange={(e) =>
                  dispatchAddingTraining({
                    type: "field",
                    field: "duration",
                    value: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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

            <Grid item sm={2}></Grid>
            <Grid item sm={4}>
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
            <Grid item sm={3}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={cancelAddingTrainingFormHandler}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}
//============ Component end ============

export default AddingTraining;

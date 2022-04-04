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
function AddingTraining({ handleClose, updateTraining, setUpdateTraining }) {
  const [addingTrainingState, dispatchAddingTraining] = useReducer(
    addingTrainingReducer,
    initialAddingTrainingState
  );
  const [categoriesList, setCategoriesList] = useState([]);
  const options = categoriesList.map((e) => e.title);
  const [dropDownValue, setDropDownValue] = useState(options[0]);

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList([...data]));
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
              <Autocomplete
                value={dropDownValue}
                onChange={(event, newValue) => {
                  dispatchAddingTraining({
                    type: "field",
                    field: "category",
                    value: newValue,
                  });
                }}
                id="category-drop-down"
                options={options}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
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
            <Grid item sm={3}>
              <Button
                variant="outlined"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => handleClose(uuid())}
              >
                Cancel
              </Button>
            </Grid>
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
          </Grid>
        </form>
      </Container>
    );
  }
}
// }
//============ Component end ============

export default AddingTraining;

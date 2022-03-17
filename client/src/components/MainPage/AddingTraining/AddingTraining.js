import React, { useReducer } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";

import { useNavigate } from "react-router-dom";

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

function AddingTraining() {
  const [addingTrainingState, dispatchAddingTraining] = useReducer(
    addingTrainingReducer,
    initialAddingTrainingState
  );

  const clickSubmitAddingTrainingHandler = useNavigate();
  const clickCancelAddingTrainingHandler = useNavigate();

  const { userContextState, userContextDispatch } = useUsersContext();

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
      <div className="successfully-add-training-container">
        <h1 className="successfully-add-training-title">
          The training was successfully added to the page!
        </h1>
        <h3 className="message">
          Click one of the buttons or you will be redirected back to the main
          page
        </h3>
        <button
          className="add-another-training"
          onClick={addingAnotherTrainingHandler}
        >
          Add another training!
        </button>
        <button
          className="return-to-main-page"
          onClick={cancelAddingTrainingFormHandler}
        >
          Back to main page
        </button>
      </div>
    );
  } else {
    return (
      <div className="adding-training">
        <div className="adding-training-container">
          <form
            className="adding-training-form"
            onSubmit={onSubmitAddingTrainingForm}
          >
            {addingTrainingState.error && (
              <p className="error">{addingTrainingState.error}</p>
            )}
            <p>Please enter training details</p>
            <input
              type="text"
              placeholder="Training title"
              required={true}
              value={addingTrainingState.title}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "title",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Category"
              required={true}
              value={addingTrainingState.category}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "category",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Duration"
              required={true}
              value={addingTrainingState.duration}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "duration",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Group size"
              value={addingTrainingState.groupSize}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "groupSize",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="date"
              placeholder="Date"
              required={true}
              value={addingTrainingState.date}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "date",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Trainer's name"
              required={true}
              value={addingTrainingState.trainer}
              onChange={(e) =>
                dispatchAddingTraining({
                  type: "field",
                  field: "trainer",
                  value: e.currentTarget.value,
                })
              }
            />
            <button
              type="submit"
              className="submit-button"
              disabled={addingTrainingState.isLoading}
            >
              {addingTrainingState.isLoading
                ? "Adding training..."
                : "Add training"}
            </button>
          </form>
          <button
            className="cancel-add-training"
            onClick={cancelAddingTrainingFormHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default AddingTraining;

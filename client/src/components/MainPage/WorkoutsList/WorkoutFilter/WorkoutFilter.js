import React, { useState } from "react";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import { v4 as uuid } from "uuid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Grid, IconButton } from "@mui/material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import DeleteWorkout from "../../Actions/DeleteWorkout";
import SubscribeWorkout from "../../Actions/SubscribeWorkout";
import UnsubscribeWorkout from "../../Actions/UnsubscribeWorkout";
import EditWorkout from "../../Actions/EditWorkout";

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

function WorkoutFilter({
  workoutsList,
  setWorkoutsList,
  search,
  setSearch,
  deleteWorkout,
  forUnsubscribeButton,
  setUpdateScheduled,
}) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    localStorage.getItem("workoutColumnVisibilityModel")
  );

  function initLocalStorage() {
    if (
      JSON.parse(localStorage.getItem("workoutColumnVisibilityModel")) === null
    ) {
      localStorage.setItem("workoutColumnVisibilityModel", JSON.stringify({}));
    }

    return JSON.parse(localStorage.getItem("workoutColumnVisibilityModel"));
  }

  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  function getSubscribedWorkoutsFromLocalStorage(obj) {
    return obj.subscribedWorkouts;
  }

  async function subscribeHandler(id) {
    const response = await fetch("/api/schedules/create", {
      method: "POST",
      body: JSON.stringify({
        userID: getUserIdFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ),
        workoutID: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    userContextDispatch({
      type: Actions.updateScheduledWorkouts,
      payload: [...userContextState.subscribedWorkouts, id],
    });
  }

  const data = {
    rows: [],
    columns: [
      {
        field: "actions",
        headerName: "Actions",
        width: 85,
        editable: false,
        renderCell: (params) => {
          return params.row.actions;
        },
      },
      { field: "id", headerName: "workout id", width: 220 },
      { field: "title", headerName: "Title", width: 150, editable: isAdmin() },
      {
        field: "Time",
        headerName: "Time",
        width: 110,
        editable: isAdmin(),
      },
      {
        field: "dayInMonth",
        headerName: "Day in month",
        width: 150,
        editable: isAdmin(),
      },
      {
        field: "trainerName",
        headerName: "Trainer",
        width: 100,
        editable: isAdmin(),
      },
      {
        field: "category",
        headerName: "Category",
        width: 100,
        editable: isAdmin(),
      },
      {
        field: "groupSize",
        headerName: "Group size",
        width: 150,
        editable: isAdmin(),
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
        editable: isAdmin(),
      },
      {
        field: "duration",
        headerName: "Duration",
        width: 150,
        editable: isAdmin(),
      },
    ],
  };

  function workoutAction(workout) {
    if (isAdmin()) {
      return (
        <Grid container>
          <Grid item sm={6}>
            <EditWorkout />
          </Grid>
          <Grid item sm={6}>
            <DeleteWorkout workout={workout} deleteWorkout={deleteWorkout} />
          </Grid>
        </Grid>
      );
    } else {
      if (
        getSubscribedWorkoutsFromLocalStorage(
          JSON.parse(localStorage.getItem("User"))
        ).find((e) => e === workout._id) === undefined
      ) {
        return (
          <Grid item sm={2}>
            <SubscribeWorkout
              workout={workout}
              subscribeHandler={subscribeHandler}
            />
          </Grid>
        );
      } else {
        const scheduled = forUnsubscribeButton.find(
          (e) => e.workoutID === workout._id
        );
        return (
          <Grid item sm={2}>
            <UnsubscribeWorkout
              scheduled={scheduled}
              setUpdateScheduled={setUpdateScheduled}
            />
          </Grid>
        );
      }
    }
  }

  data.rows = workoutsList.map((workout) => {
    const workoutValue = {
      id: workout._id,
      title: workout.title,
      Time: workout.time,
      dayInWeek: workout.dayInWeek,
      dayInMonth: workout.dayInMonth,
      weekOfYear: workout.weekOfYear,
      category: workout.category,
      trainerName: workout.trainerName,
      groupSize: workout.groupSize,
      description: workout.description,
      duration: workout.duration,
      actions: workoutAction(workout),
    };
    return workoutValue;
  });

  function matchDayInWeek(day) {
    const rowArr = data.rows.filter((row) => {
      return (
        row.dayInWeek === day &&
        row.weekOfYear === String(Number(moment().format("w")))
      );
    });
    return rowArr;
  }

  function getDayInMonth(day) {
    return data.rows
      .filter(
        (row) =>
          row.weekOfYear === String(Number(moment().format("w"))) &&
          row.dayInWeek === day
      )
      .map((row) => row.dayInMonth);
  }

  return (
    <div style={{ height: 325, width: "100%" }}>
      <Box
        sx={{
          pr: 5,
          borderRight: 1,
          borderColor: "#EEEBEB",
        }}
      >
        {week.map((day) => {
          const matchDayInMonth = getDayInMonth(day);
          return (
            <div
              style={{
                display: "flex",
                height: 325,
                width: "100%",
                marginBottom: 100,
              }}
              key={uuid()}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", alignSelf: "flex-start" }}>
                  <strong>
                    {day + ", " + matchDayInMonth[0]}
                    {": "}
                  </strong>
                </div>
                <br />
                <DataGrid
                  experimentalFeatures={{ newEditingApi: true }}
                  editMode="row"
                  checkboxSelection
                  rowHeight={50}
                  rows={matchDayInWeek(day)}
                  columns={data.columns}
                  onColumnVisibilityModelChange={(newModel) => {
                    localStorage.setItem(
                      "workoutColumnVisibilityModel",
                      JSON.stringify(newModel)
                    );
                    setColumnVisibilityModel(newModel);
                  }}
                  columnVisibilityModel={initLocalStorage()}
                  hideFooter
                />
              </div>
            </div>
          );
        })}
      </Box>
      <br />
    </div>
  );
}

export default WorkoutFilter;

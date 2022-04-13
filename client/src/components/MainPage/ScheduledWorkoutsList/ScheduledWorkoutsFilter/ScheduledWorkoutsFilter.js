import React, { useState } from "react";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UnsubscribeWorkout from "../../Actions/UnsubscribeWorkout";

function ScheduledWorkoutsFilter({
  schedulesList,
  setScheduledList,
  search,
  setSearch,
  setUpdateScheduled,
  username,
}) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    localStorage.getItem("schedulesColumnVisibilityModel")
  );

  function initLocalStorage() {
    if (
      JSON.parse(localStorage.getItem("schedulesColumnVisibilityModel")) ===
      null
    ) {
      localStorage.setItem(
        "schedulesColumnVisibilityModel",
        JSON.stringify({})
      );
    }

    return JSON.parse(localStorage.getItem("schedulesColumnVisibilityModel"));
  }

  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
  }

  function getSubscribedWorkoutsFromLocalStorage(obj) {
    return obj.subscribedWorkouts;
  }

  const data = {
    rows: [],
    columns: [
      {
        field: "actions",
        headerName: "Actions",
        width: 75,
        editable: false,
        renderCell: (params) => {
          return params.row.actions;
        },
      },
      {
        field: "username",
        headerName: "Username",
        width: 100,
      },
      { field: "id", headerName: "schedule id", width: 220 },
      { field: "workoutID", headerName: "workout id", width: 220 },
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

  function scheduledAction(scheduled) {
    return (
      <Grid item sm={2}>
        <UnsubscribeWorkout
          scheduled={scheduled}
          setUpdateScheduled={setUpdateScheduled}
        />
      </Grid>
    );
  }

  data.rows = schedulesList.map((scheduled) => {
    const scheduledValue = {
      id: scheduled._id,
      workoutID: scheduled.workoutInfo._id,
      title: scheduled.workoutInfo.title,
      Time: scheduled.workoutInfo.time,
      dayInWeek: scheduled.workoutInfo.dayInWeek,
      dayInMonth: scheduled.workoutInfo.dayInMonth,
      weekOfYear: scheduled.workoutInfo.weekOfYear,
      category: scheduled.workoutInfo.category,
      trainerName: scheduled.workoutInfo.trainerName,
      groupSize: scheduled.workoutInfo.groupSize,
      description: scheduled.workoutInfo.description,
      duration: scheduled.workoutInfo.duration,
      username: username(scheduled.userID),
      actions: scheduledAction(scheduled),
    };
    return scheduledValue;
  });

  return (
    <div style={{ height: 450, width: "100%" }}>
      <Box>
        <div
          style={{
            display: "flex",
            height: 450,
            width: "100%",
            marginBottom: 100,
            marginTop:35
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              experimentalFeatures={{ newEditingApi: true }}
              editMode="row"
              checkboxSelection
              rowHeight={50}
              rows={data.rows}
              columns={data.columns}
              onColumnVisibilityModelChange={(newModel) => {
                localStorage.setItem(
                  "schedulesColumnVisibilityModel",
                  JSON.stringify(newModel)
                );
                setColumnVisibilityModel(newModel);
              }}
              columnVisibilityModel={initLocalStorage()}
              hideFooter
            />
          </div>
        </div>
      </Box>
      <br />
    </div>
  );
}

export default ScheduledWorkoutsFilter;

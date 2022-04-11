import React, { useState } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import Search from "../Search/Search";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

import Modal from "@mui/material/Modal";
import moment from "moment";
import {
  DataGrid,
  GridLinkOperator,
  GridToolbar,
  GridRowsProp,
  GridColDef,
  GridValueSetterParams,
} from "@mui/x-data-grid";

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
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
export default function DataFilter({
  workoutsList,
  setWorkoutsList,
  search,
  setSearch,
  deleteWorkout,
}) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    groupSize: false,
    description: false,
    duration: false,
    dayInMonth: false,
  });
  const [open, setOpen] = useState(false);
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();

  function getUserIdFromLocalStorage(obj) {
    return obj.userID;
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
      payload: { ...data },
    });
  }

  const data = {
    rows: [],
    columns: [
      { field: "id", headerName: "id", width: 110 },
      { field: "title", headerName: "Title", width: 150, editable: isAdmin() },
      {
        field: "Time",
        headerName: "Time",
        width: 110,
        editable: isAdmin(),
        //   type: "dateTime",
        //   valueSetter: moment().format("kk:mm[ ]A"),
        //   valueGetter: ({ value }) => moment(value).format("kk:mm[ ]A"),
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
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        editable: false,
        renderCell: () =>{
          return workoutAction()
        },
      },
    ],
  };
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function workoutAction(workout) {
    if (isAdmin()) {
      return (
        <Grid item sm={2}>
          <Button variant="contained" size="small" onClick={handleOpen}>
            Delete
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography
                sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
                color="text.secondary"
              >
                Are you sure that you want to delete the{" "}
                <Typography variant="h7" component="span" display="inline">
                  {/* <strong>{workout.title}</strong> */}
                </Typography>{" "}
                {/* workout on <strong>{workout.date}</strong>? */}
              </Typography>

              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  sx={{ marginLeft: 0, width: 1 }}
                >
                  <Grid item sm={4} sx={{ marginLeft: 7.5 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        // deleteWorkout(workout._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                  <Grid item sm={4}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Modal>
        </Grid>
      );
    } else {
      return (
        <Grid item sm={2}>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Subscribe
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography
                sx={{ mb: 1.5, textAlign: "center", marginBottom: 5 }}
                color="text.secondary"
              >
                Please confirm your subscribing to{" "}
                <Typography variant="h7" component="span" display="inline">
                  {/* <strong>{workout.title}</strong> */}
                </Typography>{" "}
                {/* workout on <strong>{workout.date}</strong>. */}
              </Typography>
              <Container maxWidth="lg">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  sx={{ marginLeft: 0, width: 1 }}
                >
                  <Grid item sm={4} sx={{ marginLeft: 7.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        // subscribeHandler(workout._id);
                      }}
                    >
                      Confirm
                    </Button>
                  </Grid>
                  <Grid item sm={4}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Modal>
        </Grid>
      );
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
      // actions: workoutAction(workout),
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
      {/* <Search currentSearch={search} onSearch={setSearch} /> */}
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
                    {day + ", " + matchDayInMonth}
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
                  columnVisibilityModel={JSON.parse(
                    localStorage.getItem("columnVisibilityModel")
                  )}
                  onColumnVisibilityModelChange={(newModel) => {
                    localStorage.setItem(
                      "columnVisibilityModel",
                      JSON.stringify(newModel)
                    );
                    setColumnVisibilityModel(newModel);
                  }}
                  hideFooter
                  // componentsProps={{
                  //   baseButton: console.log("hello"),
                  // }}
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

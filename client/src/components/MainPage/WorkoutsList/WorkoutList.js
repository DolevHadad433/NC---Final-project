import React, { useState, useMemo } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import useSubscribeWorkout from "../../../utils/useSubscribeWorkout";
import useUnsubscribeWorkout from "../../../utils/useUnsubscribeWorkout";

import { v4 as uuid } from "uuid";
import moment from "moment";
import DeleteWorkout from "../ActionsAndUtils/DeleteWorkout";
import SubscribeWorkout from "../ActionsAndUtils/SubscribeWorkout";
import UnsubscribeWorkout from "../ActionsAndUtils/UnsubscribeWorkout";
import EditWorkout from "../ActionsAndUtils/EditWorkout";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { AppBar, Button, Grid, IconButton, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddingWorkout from "../AddingWorkout/AddingWorkout";

const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function WorkoutList({ search, setSearch }) {
  //========
  const [value, setValue] = useState(0);
  const [openAddNewWorkOut, setOpenAddNewWorkOut] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //========

  const {
    workoutsList,
    setWorkoutsList,
    schedulesForAdmin,
    schedulesForUsers,
  } = useWorkoutsContext();

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    localStorage.getItem("workoutColumnVisibilityModel")
  );
  const { isAdmin } = useUsersContext();

  const schedules = isAdmin() ? schedulesForAdmin : schedulesForUsers;

  function initLocalStorageColumnVisibility() {
    if (
      JSON.parse(localStorage.getItem("workoutColumnVisibilityModel")) === null
    ) {
      localStorage.setItem("workoutColumnVisibilityModel", JSON.stringify({}));
    }

    return JSON.parse(localStorage.getItem("workoutColumnVisibilityModel"));
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
      {
        field: "title",
        headerName: "Title",
        width: 150,
        editable: isAdmin(),
      },
      {
        field: "Time",
        headerName: "Time",
        width: 110,
        editable: isAdmin(),
      },
      // {
      //   field: "dayInMonth",
      //   headerName: "Day in month",
      //   width: 150,
      //   editable: isAdmin(),
      // },
      {
        field: "dayInWeek",
        headerName: "Day in week",
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
        width: 85,
        editable: isAdmin(),
      },
      // {
      //   field: "description",
      //   headerName: "Description",
      //   width: 150,
      //   editable: isAdmin(),
      // },
      {
        field: "duration",
        headerName: "Duration",
        width: 150,
        editable: isAdmin(),
      },
    ],
  };

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
      duration: workout.duration + " minutes",
      actions: workoutAction(workout),
    };
    return workoutValue;
  });

  function workoutAction(workout) {
    if (isAdmin()) {
      return (
        <Grid container>
          <Grid item sm={6}>
            <EditWorkout />
          </Grid>
          <Grid item sm={6}>
            <DeleteWorkout workout={workout} />
          </Grid>
        </Grid>
      );
    } else {
      if (schedules.find((e) => e.workoutID === workout._id) === undefined) {
        return (
          <Grid item sm={2}>
            <SubscribeWorkout workout={workout} />
          </Grid>
        );
      } else {
        if (schedules.find((e) => e.workoutID === workout._id) !== undefined) {
          const scheduled = schedules.find((e) => e.workoutID === workout._id);
          return (
            <Grid item sm={2}>
              <UnsubscribeWorkout scheduled={scheduled} />
            </Grid>
          );
        }
      }
    }
  }

  function addNewWorkoutsWhenThereAreNoOnTable() {
    const showOnlyForAdmin = {
      display: isAdmin() ? "flex" : "none",
    };
    function handleAddNewWorkOutModalOpen() {
      setOpenAddNewWorkOut(true);
    }
    return (
      <>
        <Button
          variant="contained"
          onClick={handleAddNewWorkOutModalOpen}
          sx={{ display: showOnlyForAdmin, marginTop: -30 }}
        >
          Add new workout?
        </Button>
        <Modal
          open={openAddNewWorkOut}
          // onClose={() => setWorkoutsList(`Update the ${uuid()} workout.`)}
        >
          <Box sx={style}>
            <AddingWorkout setOpen={setOpenAddNewWorkOut} />
          </Box>
        </Modal>
      </>
    );
  }

  function matchDayInWeek(day) {
    const rowArr = data.rows.filter((row) => {
      const dayInNum = Number(moment(row.dayInWeek, "dddd").format("d"));
      return (
        dayInNum === day &&
        row.weekOfYear === String(Number(moment().format("w")))
      );
    });
    return rowArr;
  }

  console.log("WorkoutList is render");

  function getDayInMonth(day) {
    return data.rows
      .filter(
        (row) =>
          row.weekOfYear === String(Number(moment().format("w"))) &&
          row.dayInWeek === day
      )
      .map((row) => {
        return row.dayInMonth;
      });
  }
  return (
    <>
      <div style={{ height: 325, width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              {/* <Tab label="All week" {...a11yProps(5)} /> */}
              <Tab label="Sunday" {...a11yProps(0)} />
              <Tab label="Monday" {...a11yProps(1)} />
              <Tab label="Tuesday" {...a11yProps(2)} />
              <Tab label="Wednesday" {...a11yProps(3)} />
              <Tab label="Thursday" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <div
            style={{
              display: "flex",
              height: 325,
              width: "100%",
              marginBottom: 100,
            }}
            key={uuid()}
          >
            <DataGrid
              experimentalFeatures={{ newEditingApi: true }}
              editMode="row"
              rowHeight={50}
              rows={matchDayInWeek(value)}
              columns={data.columns}
              onColumnVisibilityModelChange={(newModel) => {
                localStorage.setItem(
                  "workoutColumnVisibilityModel",
                  JSON.stringify(newModel)
                );
                setColumnVisibilityModel(newModel);
              }}
              columnVisibilityModel={initLocalStorageColumnVisibility()}
              hideFooter
              // sx={{bgcolor:"#F6F1ED", borderColor:"#D6D6D5"}}
            />
          </div>
          {matchDayInWeek(value).length !== 0
            ? ""
            : addNewWorkoutsWhenThereAreNoOnTable()}
        </Box>
      </div>
    </>
  );
}

export default WorkoutList;

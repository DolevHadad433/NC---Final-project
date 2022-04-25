import React, { useState, useMemo } from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import useSubscribeWorkout from "../../../utils/useSubscribeWorkout";
import useUnsubscribeWorkout from "../../../utils/useUnsubscribeWorkout";
import useResponsive from "../../../utils/useResponsive";
import { v4 as uuid } from "uuid";
import WorkoutListForMobile from "./WorkoutListForMobile";
import moment from "moment";
import DeleteWorkout from "../ActionsAndUtils/DeleteWorkout";
import SubscribeWorkout from "../ActionsAndUtils/SubscribeWorkout";
import UnsubscribeWorkout from "../ActionsAndUtils/UnsubscribeWorkout";
import EditWorkout from "../ActionsAndUtils/EditWorkout";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
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
  const [value, setValue] = useState(0);
  const [openAddNewWorkout, setOpenAddNewWorkout] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { showInMobileOnly, showInDesktopToTabletVerticalOnly, displayOrNot } =
    useResponsive();

  const {
    workoutsList,
    setWorkoutsList,
    schedulesForAdmin,
    schedulesForUsers,
  } = useWorkoutsContext();

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    localStorage.getItem("workoutColumnVisibilityModel")
  );
  const { userContextState, isAdmin } = useUsersContext();

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
          <Grid item xs={2}>
            <EditWorkout workout={workout} />
          </Grid>
          <Grid item xs={2}>
            <DeleteWorkout workout={workout} />
          </Grid>
        </Grid>
      );
    } else {
      if (schedules.find((e) => e.workoutID === workout._id) === undefined) {
        return (
          <Grid item xs={2}>
            <SubscribeWorkout workout={workout} />
          </Grid>
        );
      } else {
        if (schedules.find((e) => e.workoutID === workout._id) !== undefined) {
          const scheduled = schedules.find((e) => e.workoutID === workout._id);
          return (
            <Grid item xs={2}>
              <UnsubscribeWorkout scheduled={scheduled} />
            </Grid>
          );
        }
      }
    }
  }

  function showAddNewWorkoutButton() {
    function handleAddNewWorkoutModalOpen() {
      setOpenAddNewWorkout(true);
    }

    return (
      <>
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleAddNewWorkoutModalOpen}
        >
          Add new workout ?
        </Button>

        {openAddNewWorkout ? (
          <AddingWorkout
            open={openAddNewWorkout}
            setOpen={setOpenAddNewWorkout}
          />
        ) : null}
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

  function matchDayInWeekForMobile(day) {
    const sundayToThursday = [];
    const allWeek = [];

    workoutsList.map((workout) => {
      const dayInNum = Number(moment(workout.dayInWeek, "dddd").format("d"));
      const thisWeekOrAfter =
        Number(workout.weekOfYear) === Number(moment().format("w")) + 1 ||
        Number(workout.weekOfYear) === Number(moment().format("w"));
      const workoutIsEnd = moment(
        workout.dayInMonth + " " + workout.time,
        "MMM Do kk:mm A"
      ).isAfter(moment());

      const sundayToThursdayItem =
        dayInNum === day && thisWeekOrAfter && workoutIsEnd;
      const allWeekItem = dayInNum !== day && thisWeekOrAfter && workoutIsEnd;

      if (sundayToThursdayItem) {
        sundayToThursday.push(workout);
      } else if (allWeekItem) {
        allWeek.push(workout);
      }

      return workout;
    });

    if (day >= 0 && day <= 4) {
      return sundayToThursday;
    } else if (day === 5) {
      return allWeek;
    }
  }

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

  console.log("WorkoutList is render");

  if (displayOrNot(showInMobileOnly)) {
    return (
      <Container maxWidth={"sm"} sx={{ p: 0 }}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: -2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={true}
              allowScrollButtonsMobile
            >
              <Tab label="Sunday" {...a11yProps(0)} />
              <Tab label="Monday" {...a11yProps(1)} />
              <Tab label="Tuesday" {...a11yProps(2)} />
              <Tab label="Wednesday" {...a11yProps(3)} />
              <Tab label="Thursday" {...a11yProps(4)} />
              <Tab label="All week" {...a11yProps(5)} />
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ alignSelf: "center", justifySelf: "center" }}
          >
            <WorkoutListForMobile
              workouts={matchDayInWeekForMobile(value)}
              showAddNewWorkoutButton={showAddNewWorkoutButton}
              setWorkoutsList={setWorkoutsList}
            />
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container maxWidth={"lg"} sx={{ p: 0 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Sunday" {...a11yProps(0)} />
                  <Tab label="Monday" {...a11yProps(1)} />
                  <Tab label="Tuesday" {...a11yProps(2)} />
                  <Tab label="Wednesday" {...a11yProps(3)} />
                  <Tab label="Thursday" {...a11yProps(4)} />
                </Tabs>
              </Grid>
              <Grid item sm={12} sx={{ height: 400 }}>
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
              </Grid>
              <Grid
                item
                sm={12}
                sx={{ alignSelf: "center", justifySelf: "center" }}
              >
                {matchDayInWeek(value).length === 0
                  ? showAddNewWorkoutButton()
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default WorkoutList;

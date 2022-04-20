import React, { useState } from "react";
import AppBarMain from "../../ActionsAndUtils/AppBarMain";
import ScheduledWorkoutsList from "../../ScheduledWorkoutsList/ScheduledWorkoutsList";
import useResponsive from "../../../../utils/useResponsive";
import { useWorkoutsContext } from "../../../../contexts/WorkoutsContext";
import { useUsersContext } from "../../../../contexts/UsersContext";
import MainMenu from "../../ActionsAndUtils/MainMenu";
import ScheduledWorkoutsForMobile from "../../ScheduledWorkoutsList/ScheduledWorkoutsForMobile";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

function MyWorkouts({ updateWorkout, setUpdateWorkout, workoutBaseList }) {
  const {
    showInMobileOnly,
    showInTabletOnly,
    showInTabletVerticalOnly,
    showInTabletHorizontalOnly,
    showInTabletVerticalAndBelow,
    showInTabletHorizontalAndBelow,
    showInLaptopOnly,
    showInLaptopAndBelow,
    showInLaptopToTabletVertical,
    showInLaptopToTabletHorizontalOnly,
    showInDesktopToTabletVerticalOnly,
    showInDesktopToTabletHorizontalOnly,
    showInDesktopToLaptopOnly,
    showInDesktopOnly,
    showInAllWidth,
  } = useResponsive();
  const { isAdmin } = useUsersContext();
  const { schedulesForAdmin, schedulesForUsers, userNames } =
    useWorkoutsContext();

  const schedules = isAdmin() ? schedulesForAdmin : schedulesForUsers;

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function whatIsYourUserName(userId) {
    const username = userNames.find((e) => e._id === userId);
    if (username !== undefined) {
      return username.username;
    } else return "";
  }

  function matchDayInWeekForMobile(day) {
    const matchSchedules = schedules.filter((scheduled) => {
      const dayInNum = Number(
        moment(scheduled.workoutInfo.dayInWeek, "dddd").format("d")
      );
      return (
        dayInNum === day &&
        scheduled.workoutInfo.weekOfYear ===
          String(Number(moment().format("w")))
      );
    });
    return matchSchedules;
  }

  return (
    <div>
      <Container maxWidth={"lg"}>
        <Grid container>
          <Grid item xs={12} style={showInMobileOnly}>
            <Grid container>
              <Grid item xs={12} sx={{ justifySelf: "flex-start" }}>
                <MainMenu />
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{ alignSelf: "center", justifySelf: "center" }}
                >
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
                  </Tabs>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ alignSelf: "center", justifySelf: "center" }}
                >
                  <ScheduledWorkoutsForMobile
                    whatIsYourUserName={whatIsYourUserName}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} style={showInDesktopToTabletVerticalOnly}>
            <Grid container >
              <Grid container rowSpacing={12}>
                <Grid item sm={12}>
                  <AppBarMain />
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    color="text.secondary"
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: 22,
                    }}
                  >
                    {isAdmin()
                      ? "Workouts subscriptions:"
                      : "Manage your schedules workouts!"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container rowSpacing={12}>
                <Grid
                  item
                  sm={12}
                  sx={{ alignSelf: "center", justifySelf: "center" }}
                >
                  <ScheduledWorkoutsList
                    whatIsYourUserName={whatIsYourUserName}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MyWorkouts;

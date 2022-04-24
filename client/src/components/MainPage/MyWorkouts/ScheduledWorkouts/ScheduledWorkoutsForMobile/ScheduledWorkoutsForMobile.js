import React, { useState } from "react";
import { useUsersContext } from "../../../../../contexts/UsersContext";
import { useWorkoutsContext } from "../../../../../contexts/WorkoutsContext";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Container,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import ItemListScheduledForMobile from "./ItemListScheduledForMobile/ItemListScheduledForMobile";
import HistoryScheduledForMobile from "../../HistoryScheduled/HistoryScheduledForMobile/HistoryScheduledForMobile";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import moment from "moment";
import { v4 as uuid } from "uuid";

function ScheduledWorkoutsForMobile({
  schedules,
  historyScheduledList,
  setHistoryScheduledList,
  setSchedules,
}) {
  const { isAdmin } = useUsersContext();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [secondaryAll, setSecondaryAll] = useState(false);
  const [descriptionAll, setDescriptionAll] = useState(false);
  const [showPastScheduled, setShowPastScheduled] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const openMenu = Boolean(anchorMenu);

  // console.log("Scheduled mobile");
  // console.log(moment());

  function thisWeekOrAfter() {
    const thisWeek = [];
    const nextWeek = [];
    schedules.map((scheduled) => {
      if (
        Number(scheduled.workoutInfo.weekOfYear) ===
        Number(moment().format("w")) + 1
      ) {
        nextWeek.push(scheduled);
      } else if (
        Number(scheduled.workoutInfo.weekOfYear) ===
        Number(moment().format("w"))
      ) {
        thisWeek.push(scheduled);
      }
      return scheduled;
    });
    return { thisWeek, nextWeek };
  }

  const { thisWeek, nextWeek } = thisWeekOrAfter();

  const thereAreExpectedWorkouts = thisWeek.length > 0 || nextWeek > 0;

  function showDivider(week) {
    if (week !== undefined && week.length > 1) {
      return true;
    } else return false;
  }

  return (
    <Container maxWidth={"sm"} sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}>
      <Grid
        container
        spacing={0}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid
            container
            spacing={0}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={1} sx={{ alignSelf: "center" }}>
              <IconButton
                sx={{ color: "#b3b3b3" }}
                size="small"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={0}>
              <Grid container sx={{ justifyContent: "flex-end" }}>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorMenu}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <Grid item xs={12}>
                    <MenuItem>
                      <Switch
                        checked={secondaryAll}
                        onChange={(event) => {
                          setSecondaryAll(event.target.checked);
                        }}
                      />
                      More information
                    </MenuItem>
                  </Grid>
                  <Grid item xs={12}>
                    <MenuItem>
                      <Switch
                        checked={descriptionAll}
                        onChange={(event) => {
                          setDescriptionAll(event.target.checked);
                        }}
                      />
                      Show workouts description
                    </MenuItem>
                  </Grid>
                  <Grid item xs={12}>
                    <MenuItem>
                      <Switch
                        checked={showPastScheduled}
                        onChange={(event) => {
                          setShowPastScheduled(event.target.checked);
                        }}
                      />
                      Show history
                    </MenuItem>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      sx={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <Grid
                        item
                        xs={2}
                        sx={{ paddingTop: 1, paddingBottom: 1 }}
                      >
                        <Link
                          href="#"
                          underline="hover"
                          onClick={handleMenuClose}
                        >
                          close
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Menu>
              </Grid>
            </Grid>
            <Grid item xs={9} sx={{ alignSelf: "center" }}>
              <Typography
                color="text.secondary"
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: 17,
                }}
              >
                {isAdmin()
                  ? "Workouts subscriptions:"
                  : schedules.length === 0
                  ? "You havn't subscribed to any workouts for today!"
                  : "Manage your schedules workouts!"}
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ alignSelf: "center" }}>
              <IconButton
                sx={{ color: "#b3b3b3" }}
                size="small"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={() => {
                  setSchedules(`History schedules has refresh ${uuid()}`);
                  setHistoryScheduledList(
                    `History schedules has refresh ${uuid()}`
                  );
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="history-scheduled" xs={12}>
          {showPastScheduled && thereAreExpectedWorkouts ? (
            <Divider
              sx={{
                fontSize: 16,
                fontStyle: "italic",
                color: "text.secondary",
                mt: 2,
                mb: 1,
              }}
            >
              Expected workouts
            </Divider>
          ) : null}

          {thisWeek.length > 0 ? (
            <Grid item xs={12}>
              <Divider
                sx={{
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "text.secondary",
                  mt: 1,
                  mb: 1,
                }}
              >
                This week
              </Divider>
              <List>
                {thisWeek.map((scheduled) => {
                  return (
                    <ItemListScheduledForMobile
                      key={scheduled._id}
                      scheduled={scheduled}
                      secondaryAll={secondaryAll}
                      descriptionAll={descriptionAll}
                      schedules={schedules}
                      showDivider={showDivider(thisWeek)}
                    />
                  );
                })}
              </List>
              {nextWeek.length > 0 ? (
                <Divider
                  sx={{
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "text.secondary",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  Next week
                </Divider>
              ) : null}
            </Grid>
          ) : null}
          {nextWeek.length > 0 ? (
            <Grid item xs={12}>
              <List>
                {nextWeek.map((scheduled) => {
                  return (
                    <ItemListScheduledForMobile
                      key={scheduled._id}
                      scheduled={scheduled}
                      secondaryAll={secondaryAll}
                      descriptionAll={descriptionAll}
                      schedules={schedules}
                      showDivider={showDivider(nextWeek)}
                    />
                  );
                })}
              </List>
            </Grid>
          ) : null}
        </Grid>

        {showPastScheduled ? (
          <Grid item className="scheduled" xs={12}>
            <Divider
              sx={{
                fontSize: 16,
                fontStyle: "italic",
                color: "text.secondary",
                mt: 2,
                mb: 1,
              }}
            >
              Workouts that has already ended
            </Divider>

            <List>
              {historyScheduledList
                .filter(
                  (scheduled) =>
                    moment(
                      scheduled.workoutInfo.dayInMonth +
                        " " +
                        scheduled.workoutInfo.time,
                      "MMM Do kk:mm A"
                    ).isBefore(moment()) &&
                    Number(scheduled.workoutInfo.weekOfYear) >
                      Number(moment().format("w")) - 2
                )
                .map((scheduled) => {
                  return (
                    <HistoryScheduledForMobile
                      key={scheduled._id}
                      scheduled={scheduled}
                      secondaryAll={secondaryAll}
                      descriptionAll={descriptionAll}
                      historyScheduledList={historyScheduledList}
                    />
                  );
                })}
            </List>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}

export default ScheduledWorkoutsForMobile;

import React, { useState } from "react";
import {
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
  Link,
} from "@mui/material";
import { useUsersContext } from "../../../contexts/UsersContext";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import UnsubscribeWorkout from "./UnsubscribeWorkout";

function DisplayWorkoutsMenu({
  workout,
  secondaryAll,
  descriptionAll,
  workoutAction,
  showDivider,
}) {
  const { isAdmin } = useUsersContext();
  const { whatIsYourUserName } = useWorkoutsContext();
  const [secondary, setSecondary] = useState(false);
  const [secondaryShow, setSecondaryShow] = useState(false);
  const [description, setDescription] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const openMenu = Boolean(anchorMenu);
  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  // console.log("display menu");

  function isChecked(checkedAll, checkedThis) {
    if (checkedThis) {
      return true;
    } else if (checkedAll && checkedThis) {
      return true;
    } else if (!checkedAll && !checkedThis) {
      return false;
    } else if (!checkedThis) {
      return false;
    } else if (checkedAll || checkedThis) {
      return true;
    } else if (!checkedAll && checkedThis) {
      return true;
    }
  }

  function isShow(checkedAll, checkedThis) {
    let whatToShow = false;
    switch (true) {
      case checkedAll && checkedThis:
        whatToShow = true;
        return whatToShow;
      case checkedThis:
        whatToShow = true;
        return whatToShow;
      case !checkedAll && !checkedThis:
        whatToShow = false;
        return whatToShow;
      case checkedAll || checkedThis:
        whatToShow = true;
        return whatToShow;

      default:
        return whatToShow;
    }

    // if (checkedAll && checkedThis) {
    //   return true;
    // } else if (checkedThis) {
    //   return true;
    // } else if (!checkedAll && !checkedThis) {
    //   return false;
    // } else if (checkedAll || checkedThis) {
    //   return true;
    // } else if (!checkedThis) {
    //   return false;
    // }
  }

  return (
    <div>
      <Grid container spacing={0} sx={{ alignItems: "center" }}>
        <Grid item xs={1} sx={{ justifySelf: "flex-start" }}>
          <IconButton
            sx={{ color: "#b3b3b3" }}
            size="small"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
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
                    checked={isChecked(secondaryAll, secondary)}
                    onChange={(event) => {
                      setSecondary(event.target.checked);
                      //   return setSecondaryShow(!secondaryShow);
                    }}
                  />
                  More information
                </MenuItem>
              </Grid>
              <Grid item xs={12}>
                <MenuItem>
                  <Switch
                    checked={isChecked(descriptionAll, description)}
                    onChange={(event) => {
                      setDescription(event.target.checked);
                    }}
                  />
                  Show workouts description
                </MenuItem>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{
                    justifyContent: "flex-end",
                  }}
                >
                  <Grid item xs={2} sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    <Link href="#" underline="hover" onClick={handleMenuClose}>
                      close
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Menu>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <ListItem
            divider={showDivider}
            key={workout._id}
            secondaryAction={<IconButton edge="end"></IconButton>}
            sx={{ p: 1 }}
          >
            <Grid container>
              <Grid item xs={9}>
                <ListItemText
                  primary={
                    <Typography
                      variant="h7"
                      sx={{ fontWeight: 500 }}
                      component="div"
                    >
                      {workout.title}
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "normal" }}
                        component="div"
                      >
                        {workout.dayInMonth}, {workout.time}{" "}
                        {isAdmin() ? (
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "normal" }}
                            component="div"
                          >
                            Trainer: {workout.trainerName}
                          </Typography>
                        ) : (
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "normal" }}
                            component="div"
                          >
                            Trainer: {workout.trainerName}
                          </Typography>
                        )}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    isShow(secondaryAll, secondary) ? (
                      isAdmin() ? (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "normal" }}
                          component="div"
                        >
                          Category: {workout.category}
                          <br />
                          Duration: {workout.duration}
                          <br />
                          Group size: {workout.groupSize}
                          <br />
                          Day in week: {workout.dayInWeek}
                          <br />
                          Week of year: {workout.weekOfYear}
                          <br />
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "normal" }}
                          component="div"
                        >
                          Category: {workout.category}
                          <br />
                          Duration: {workout.duration}
                          <br />
                          Group size: {workout.groupSize}
                          <br />
                          Day in week: {workout.dayInWeek}
                          <br />
                        </Typography>
                      )
                    ) : null
                  }
                />
                <ListItemText
                  secondary={
                    isShow(descriptionAll, description) ? (
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "normal" }}
                        component="div"
                      >
                        Description: {workout.description}
                      </Typography>
                    ) : null
                  }
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  alignSelf: "center",
                }}
              >
                {workoutAction(workout)}
              </Grid>
            </Grid>
          </ListItem>
        </Grid>
      </Grid>
    </div>
  );
}

export default DisplayWorkoutsMenu;

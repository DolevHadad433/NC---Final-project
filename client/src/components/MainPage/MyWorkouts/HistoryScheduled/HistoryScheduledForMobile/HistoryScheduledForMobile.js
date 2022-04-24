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
import { useUsersContext } from "../../../../../contexts/UsersContext";
import { useWorkoutsContext } from "../../../../../contexts/WorkoutsContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UnsubscribeWorkout from "./../../../ActionsAndUtils/UnsubscribeWorkout";

function HistoryScheduledForMobile({
  scheduled,
  secondaryAll,
  descriptionAll,
  historyScheduledList,
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
  console.log("History scheduled is show");

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
    <Grid container spacing={0} sx={{ alignItems: "center" }}>
      <Grid item xs={11}>
        <ListItem
          divider={historyScheduledList.length > 1}
          key={scheduled._id}
          secondaryAction={<IconButton edge="end"></IconButton>}
          sx={{ p: 1 }}
        >
          <Grid container>
            <Grid item xs={9}>
              <ListItemText
              sx={{color:"text.secondary"}}
                primary={
                  <Typography
                    variant="h7"
                    sx={{ fontWeight: 500, fontSize:13}}
                    component="div"
                  >
                    {scheduled.workoutInfo.title}
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "normal", fontSize:12 }}
                      component="div"
                    >
                      {scheduled.workoutInfo.dayInMonth},{" "}
                      {scheduled.workoutInfo.time}{" "}
                      {isAdmin() ? (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "normal", fontSize:12  }}
                          component="div"
                        >
                          Username: {whatIsYourUserName(scheduled.userID)}
                          <br />
                          Trainer: {scheduled.workoutInfo.trainerName}
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "normal", fontSize:12  }}
                          component="div"
                        >
                          Category: {scheduled.workoutInfo.category}, 
                          Trainer: {scheduled.workoutInfo.trainerName}
                        </Typography>
                      )}
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </ListItem>
      </Grid>
    </Grid>
  );
}

export default HistoryScheduledForMobile;

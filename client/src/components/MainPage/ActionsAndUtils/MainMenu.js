import React, { useState } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import useResponsive from "../../../utils/useResponsive";
import AddingWorkout from "../AddingWorkout/AddingWorkout";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box } from "@mui/system";
import { Modal, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function MainMenu() {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(false)
  const [openAddNewWorkout, setOpenAddNewWorkout] = useState(false);
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();
  const { showInMobileOnly, showInDesktopToTabletVerticalOnly } =
    useResponsive();
  const clickMyWorkoutsButtonHandler = useNavigate();
  const clickHomeButtonHandler = useNavigate();
  const clickAllScheduledWorkoutsButtonHandler = useNavigate();
  const clickLogOutHandler = useNavigate();

  // const openMenu = Boolean(anchorMenu);

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
    setOpenMenu(true)
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
    setOpenMenu(false)
  };

  function handleAddNewWorkoutModalOpen() {
    setOpenAddNewWorkout(true);
  }

  const showOnlyForAdmin = {
    display: isAdmin() ? "flex" : "none",
  };

  const showOnlyForUsers = {
    display: isAdmin() ? "none" : "flex",
  };

  async function onLogOutButtonClick() {
    localStorage.setItem("User", JSON.stringify({ username: "", userID: "" }));
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/", { replace: true });
  }

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  return (
    <div>
      <IconButton
        style={showInMobileOnly}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleMenuClick}
      >
        {openMenu ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>

      <IconButton
        style={showInDesktopToTabletVerticalOnly}
        size="large"
        color="inherit"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleMenuClick}
      >
        {openMenu ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorMenu}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          style={showInMobileOnly}
          sx={{
            fontWeight: "bold",
            fontSize: "large",
            color: "text.secondary",
          }}
        >
          Hello{" "}
          {getUsernameFromLocalStorage(
            JSON.parse(localStorage.getItem("User"))
          )}
          !
        </MenuItem>

        <MenuItem
          style={showInMobileOnly}
          onClick={() => clickHomeButtonHandler("/main-page")}
        >
          Workouts this week
        </MenuItem>
        <MenuItem
          onClick={handleAddNewWorkoutModalOpen}
          sx={{ display: showOnlyForAdmin }}
        >
          Add new workout
        </MenuItem>

        {openAddNewWorkout ? (
          <AddingWorkout
            open={openAddNewWorkout}
            setOpen={setOpenAddNewWorkout}
            handleMenuClose={handleMenuClose}
          />
        ) : null}

        <MenuItem
          onClick={() => {
            clickAllScheduledWorkoutsButtonHandler("/all-scheduled-workouts");
            handleMenuClose();
          }}
          sx={{ display: showOnlyForAdmin }}
        >
          All scheduled workouts
        </MenuItem>
        <MenuItem
          onClick={() => {
            clickMyWorkoutsButtonHandler("/my-workouts");
            handleMenuClose();
          }}
          sx={{ display: showOnlyForUsers }}
        >
          My workouts
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={onLogOutButtonClick}>
          <LogoutIcon fontSize="small" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MainMenu;

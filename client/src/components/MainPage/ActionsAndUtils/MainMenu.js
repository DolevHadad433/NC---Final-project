import React, { useState } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import AddingWorkout from "../AddingWorkout/AddingWorkout";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

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

function MainMenu() {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [openAddNewWorkOut, setOpenAddNewWorkOut] = useState(false);
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();
  const clickMyWorkoutsButtonHandler = useNavigate();
  const clickLogOutHandler = useNavigate();

  const openMenu = Boolean(anchorMenu);

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  function handleAddNewWorkOutModalOpen() {
    setOpenAddNewWorkOut(true);
  }

  const showOnlyForAdmin = {
    display: isAdmin() ? "flex" : "none",
  };

  const showOnlyForUsers = {
    display: isAdmin() ? "none" : "flex",
  };

  async function onLogOutButtonClick() {
    localStorage.removeItem("User");
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/", { replace: true });
  }

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleMenuClick}
      >
        <MenuIcon />
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
        <Modal open={openAddNewWorkOut}>
          <Box sx={style}>
            <AddingWorkout
              setOpen={setOpenAddNewWorkOut}
              handleMenuClose={handleMenuClose}
            />
          </Box>
        </Modal>
        <MenuItem
          onClick={handleAddNewWorkOutModalOpen}
          sx={{ display: showOnlyForAdmin }}
        >
          Add new workout
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: showOnlyForAdmin }}>
          All scheduled workouts
        </MenuItem>
        <MenuItem
          onClick={() => clickMyWorkoutsButtonHandler("/main-page/my-workouts")}
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

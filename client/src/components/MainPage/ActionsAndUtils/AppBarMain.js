import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MainMenu from "./MainMenu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import IconButton from "@mui/material/IconButton";

function AppBarMain() {
  const clickHomeButtonHandler = useNavigate();

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }
  return (
    <AppBar>
      <Toolbar>
        <MainMenu />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: -2 }}
        >
          Hello{" "}
          {getUsernameFromLocalStorage(
            JSON.parse(localStorage.getItem("User"))
          )}
          !
        </Typography>
        {/* <Search currentSearch={search} onSearch={setSearch} /> */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="Home-button"
          sx={{ mr: 2 }}
          onClick={() => clickHomeButtonHandler("/main-page")}
        >
          <HomeRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarMain;

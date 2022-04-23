import React, { useState } from "react";
import { Grid, IconButton, Link, Menu, MenuItem, Switch } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function ScheduledSwitchMenu({
  secondaryAll,
  setSecondaryAll,
  descriptionAll,
  setDescriptionAll,
  openMenu,
  anchorMenu,
  handleMenuClose,
  setAnchorMenu
}) {
  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  return (
    <Grid container sx={{ justifyContent: "flex-end" }}>
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
  );
}

export default ScheduledSwitchMenu;

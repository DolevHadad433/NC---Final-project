import React from "react";

import AppBar from "@mui/material/AppBar";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { borderRadius } from "@mui/system";

function ScheduledTrainings() {
  return (
    <AppBar
      position="static"
      sx={{ textAlign: "center", width: 200, borderRadius: 1 }}
    >
      <Typography variant="h6" component="div">
        My trainings:
      </Typography>
    </AppBar>
  );
}

export default ScheduledTrainings;

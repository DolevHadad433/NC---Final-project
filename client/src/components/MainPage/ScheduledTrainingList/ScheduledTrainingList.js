import React from "react";
import ScheduledTraining from "./ScheduledTraining/ScheduledTraining";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import AppBar from "@mui/material/AppBar";

import Typography from "@mui/material/Typography";

function ScheduledTrainings() {
  const { userContextState, userContextDispatch } = useUsersContext();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          textAlign: "center",
          width: 200,
          borderRadius: 1,
          marginLeft: 10,
          marginBottom: 4,
        }}
      >
        <Typography variant="h6" component="div">
          My trainings:
        </Typography>
      </AppBar>

      {userContextState.scheduledTraining.map((scheduled) => {
        return <ScheduledTraining {...scheduled} />;
      })}
    </>
  );
}

export default ScheduledTrainings;

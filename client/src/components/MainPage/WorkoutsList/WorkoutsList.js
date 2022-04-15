//============ Imports start ============
import React from "react";
import { useWorkoutsContext } from "../../../contexts/WorkoutsContext";
import { Container, Box } from "@mui/material";
import WorkoutFilter from "./WorkoutFilter/WorkoutFilter";

//============ Imports end ============

//============ Component start ============
function WorkoutsList({
  search,
  setSearch,
}) {

  return (
    <Container maxWidth="xl" sx={{}}>
      <div className="WorkoutsList">
        <div className="workout-container-list">
          <WorkoutFilter
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
    </Container>
  );
}
//============ Component end ============

export default WorkoutsList;

//============ Imports start ============
import React, { useState, useEffect } from "react";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import WorkoutsCategoryChooser from "./WorkoutsCategoryChooser/WorkoutsCategoryChooser";
import ScheduledWorkoutsList from "./ScheduledWorkoutsList/ScheduledWorkoutsList";
import WorkoutsList from "./WorkoutsList/WorkoutsList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddingWorkout from "./AddingWorkout/AddingWorkout";
import Search from "@mui/icons-material/Search";

//============ Imports end ============

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

//============ Component start ============
function MainPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [updateWorkout, setUpdateWorkout] = useState("");
  const [workoutBaseList, setWorkoutBaseList] = useState([]);
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();
  const clickLogOutHandler = useNavigate();

  async function onLogOutButtonClick() {
    localStorage.removeItem("User");
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  useEffect(() => {
    fetch("/api/workoutsBase/")
      .then((responseWorkoutsBase) => responseWorkoutsBase.json())
      .then((dataWorkoutsBase) => setWorkoutBaseList([...dataWorkoutsBase]));
  }, []);

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose(id) {
    setOpen(false);
    setUpdateWorkout(`Update the ${id} workout.`);
  }

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello{" "}
                {getUsernameFromLocalStorage(
                  JSON.parse(localStorage.getItem("User"))
                )}
                !
              </Typography>
              {/* <Search currentSearch={search} onSearch={setSearch} /> */}

              {isAdmin() ? (
                <>
                  <Button color="inherit" onClick={handleOpen}>
                    Add new workout
                  </Button>
                  <Modal open={open}>
                    <Box sx={style}>
                      <AddingWorkout
                        handleClose={handleClose}
                        updateWorkout={updateWorkout}
                        setUpdateWorkout={setUpdateWorkout}
                        workoutBaseList={workoutBaseList}
                      />
                    </Box>
                  </Modal>
                </>
              ) : (
                ""
              )}
              <Button color="inherit" onClick={onLogOutButtonClick}>
                Log out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <Container maxWidth="xxl">
        <Grid
          container
          spacing={0}
          direction="row"
          sx={{ marginTop: 5, marginLeft: 0 }}
        >
          <Grid item sm={7}>
            <Grid container spacing={4} direction="row">
              <Grid item sm={12}>
                <div className="main-page-preference-container">
                  {/* <WorkoutsCategoryChooser /> */}
                </div>
              </Grid>

              <Grid item sm={12} align="center" sx={{ marginLeft: 0 }}>
                <div className="main-page-body">
                  <AppBar
                    position="static"
                    sx={{
                      textAlign: "center",
                      width: 250,
                      borderRadius: 1,
                      marginLeft: 3,
                      marginBottom: 4,
                      marginTop: -4,
                    }}
                  >
                    <Typography variant="h6" component="div">
                      Workouts this week:
                    </Typography>
                  </AppBar>
                  
                    <WorkoutsList
                      search={search}
                      setSearch={setSearch}
                      updateWorkout={updateWorkout}
                      setUpdateWorkout={setUpdateWorkout}
                    />
                 
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5}>
            <ScheduledWorkoutsList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
//============ Component end ============

export default MainPage;

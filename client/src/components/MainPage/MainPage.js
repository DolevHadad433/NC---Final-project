//============ Imports start ============
import React, { useState } from "react";
import "./MainPage.css";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import ScheduledTrainingList from "./ScheduledTrainingList/ScheduledTrainingList";
import TrainingList from "./TrainingList/TrainingList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Container, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddingTraining from "./AddingTraining/AddingTraining";
import { padding } from "@mui/system";
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
  const [updateTraining, setUpdateTraining] = useState("");
  const { userContextState, userContextDispatch, isAdmin } = useUsersContext();
  const clickLogOutHandler = useNavigate();

  async function onLogOutButtonClick() {
    localStorage.setItem("User", JSON.stringify({ username: "", userID: "" }));
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  function getUsernameFromLocalStorage(obj) {
    return obj.username;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose(id) {
    setOpen(false);
    setUpdateTraining(`Update the ${id} training.`);
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
              <Search currentSearch={search} onSearch={setSearch} />

              {isAdmin() ? (
                <>
                  <Button color="inherit" onClick={handleOpen}>
                    Add new training
                  </Button>
                  <Modal open={open}>
                    <Box sx={style}>
                      <AddingTraining
                        handleClose={handleClose}
                        updateTraining={updateTraining}
                        setUpdateTraining={setUpdateTraining}
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
                  <TrainingCategoryChooser />
                </div>
              </Grid>

              <Grid item sm={12} sx={{ marginLeft: 0 }}>
                <div className="main-page-body">
                  <Routes>
                    <Route
                      index
                      element={
                        <TrainingList
                          search={search}
                          updateTraining={updateTraining}
                          setUpdateTraining={setUpdateTraining}
                        />
                      }
                    />
                    <Route
                      path=":category"
                      element={
                        <TrainingList
                          search={search}
                          updateTraining={updateTraining}
                          setUpdateTraining={setUpdateTraining}
                        />
                      }
                    />
                  </Routes>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5}>
            <ScheduledTrainingList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
//============ Component end ============

export default MainPage;

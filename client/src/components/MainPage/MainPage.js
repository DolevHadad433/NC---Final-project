import React, { useState } from "react";
import "./MainPage.css";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import ScheduledTrainings from "./ScheduledTrainings/ScheduledTrainings";
import TrainingList from "./TrainingList/TrainingList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddingTraining from "./AddingTraining/AddingTraining";

function MainPage() {
  const [search, setSearch] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickLogOutHandler = useNavigate();
  const clickAddNewTraining = useNavigate();

  // userContextDispatch({
  //   type: "get-localstorage",
  //   payload: localStorage.getItem("username"),
  // });

  async function onLogOutButtonClick() {
    localStorage.setItem("username", "");
    userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  function addNewTraining() {
    clickAddNewTraining("/add-new-training");
  }

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <div className="user-preference-container">
          <h3 className="hello-username">
            Hello {localStorage.getItem("username")}!
          </h3>

          <div className="user-tools-preference-container">
            
              <Search currentSearch={search} onSearch={setSearch} />
         

            {(function isAdmin() {
              if (
                userContextState.username === "Admin" ||
                userContextState.username === "admin" ||
                localStorage.getItem("username") === "Admin" ||
                localStorage.getItem("username") === "admin"
              ) {
                return (
                  <button className="btn" onClick={addNewTraining}>
                    Add new training
                  </button>
                );
              }
            })()}

            <button className="btn" onClick={onLogOutButtonClick}>
              Log out
            </button>
          </div>
        </div>
        <div className="main-page-preference-container">
          <ScheduledTrainings />
          <TrainingCategoryChooser />
          {/* {checkAdmin} */}
        </div>
      </div>
      <div className="main-page-body">
        <Routes>
          <Route index element={<TrainingList search={search} />} />
          <Route path=":category" element={<TrainingList search={search} />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainPage;

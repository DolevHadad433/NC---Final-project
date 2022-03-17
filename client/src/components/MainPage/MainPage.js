import React, { useState } from "react";
import { useUsersContext, Actions } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import FavoriteList from "./FavoriteList/FavoriteList";
import TrainingList from "./TrainingList/TrainingList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddingTraining from "./AddingTraining/AddingTraining";

function MainPage() {
  const [search, setSearch] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickLogOutHandler = useNavigate();
  const clickAddNewTraining = useNavigate();
  async function onLogOutButtonClick() {
    await userContextDispatch({ type: Actions.logOutSuccess });
    clickLogOutHandler("/");
  }

  function addNewTraining() {
    clickAddNewTraining("/add-new-training");
  }

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <h1>hello {userContextState.username}!</h1>
        <br />
        <button onClick={onLogOutButtonClick}>Log out</button>
        <br />
        {(function isAdmin() {
          if (
            userContextState.username === "Admin" ||
            userContextState.username === "admin"
          ) {
            return <button onClick={addNewTraining}>Add new training</button>;
          }
        })()}
        <br />
        <Search currentSearch={search} onSearch={setSearch} />
        <FavoriteList />
        <TrainingCategoryChooser />
        {/* {checkAdmin} */}
      </div>
      <Routes>
        <Route index element={<TrainingList search={search} />} />
        <Route path=":category" element={<TrainingList search={search} />} />
      </Routes>
    </div>
  );
}

export default MainPage;

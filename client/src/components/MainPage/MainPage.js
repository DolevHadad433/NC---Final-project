import React, { useState } from "react";
import { useUsersContext } from "../../contexts/UsersContext";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import FavoriteList from "./FavoriteList/FavoriteList";
import TrainingList from "./TrainingList/TrainingList";
import { Routes, Route, useNavigate } from "react-router-dom";

function MainPage() {
  const [search, setSearch] = useState("");
  const { userContextState, userContextDispatch } = useUsersContext();
  const clickLogOutHandler = useNavigate();

  function onLogOutButtonClick() {
    clickLogOutHandler("/");
  }

  return (
    <div className="MainPage">
      <div className="main-page-header">
        <h1>hello {userContextState.username}!</h1>
        {"   "}
        <button onClick={onLogOutButtonClick}>Log out</button>
        <Search currentSearch={search} onSearch={setSearch} />
        <FavoriteList />
        <TrainingCategoryChooser />
      </div>
      <Routes>
        <Route path="/main-page/" element={<TrainingList search={search} />} />
        <Route
          path="/main-page/:category"
          element={<TrainingList search={search} />}
        />
      </Routes>
    </div>
  );
}

export default MainPage;

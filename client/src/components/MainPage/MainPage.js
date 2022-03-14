import React from "react";
import Search from "./Search/Search";
import TrainingCategoryChooser from "./TrainingCategoryChooser/TrainingCategoryChooser";
import FavoriteList from "./FavoriteList/FavoriteList";
import TrainingList from "./TrainingList/TrainingList";

function MainPage(props) {
  return (
    <div className="MainPage">
      <div className="main-page-header">
        <h1>hello {props.username}!</h1>
        {"   "}
        <button onClick={props.logOut}>Log out</button>
      </div>
      <div className="main-page-body">
        <Search />
        <TrainingCategoryChooser />
        <FavoriteList />
        <TrainingList />
      </div>
    </div>
  );
}

export default MainPage;

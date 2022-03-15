import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";

import LogIn from "./LogIn/LogIn";
import MainPage from "./MainPage/MainPage";
import SignUp from "./SignUp/SignUp";
import TrainingList from "./MainPage/TrainingList/TrainingList";

function App() {
  

  return (
    <UsersProvider>
      <div className="App">
        <div className="header"></div>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/main-page/*" element={<MainPage/>}/>
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </UsersProvider>
  );
}

export default App;

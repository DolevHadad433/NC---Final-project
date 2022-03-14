import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";

import LogIn from "./LogIn/LogIn";

function App() {
  return (
    <UsersProvider>
      <div className="App">
        <div className="header"></div>
        <Routes>
          <Route path="/" element={<LogIn />}/>
        </Routes>
      </div>
    </UsersProvider>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";
import { WorkoutsProvider } from "../contexts/WorkoutsContext";
import LogIn from "./LogIn/LogIn";
import MainPage from "./MainPage/MainPage";
import SignUp from "./SignUp/SignUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckResponsive from "./CheckResponsive";
import { breakpoints } from "@mui/system";
import MyWorkouts from "./MainPage/MyWorkouts/MyWorkouts";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },

  palette: {
    primary: {
      light: "#c2b0e2",
      main: "#648dae",
      dark: "#7d6d99",
      contrastText: "#fff",
    },
    secondary: {
      light: "#81a18f",
      main: "#81a18f",
      dark: "#648dae",
      contrastText: "#000",
    },
  },
});

function App() {
  
  return (
    // <ThemeProvider theme={theme} breakpoints={breakpoints}>
    <UsersProvider>
      <WorkoutsProvider>
        <div className="App">
          <div className="header"></div>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/main-page//*" element={<MainPage />} />
            <Route path="/my-workouts" element={<MyWorkouts />} />
            <Route path="/all-scheduled-workouts" element={<MyWorkouts />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/responsive" element={<CheckResponsive />} />
          </Routes>
        </div>
      </WorkoutsProvider>
    </UsersProvider>
    // </ThemeProvider>
  );
}

export default App;

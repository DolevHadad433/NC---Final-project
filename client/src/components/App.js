import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";
import LogIn from "./LogIn/LogIn";
import MainPage from "./MainPage/MainPage";
import SignUp from "./SignUp/SignUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#c2b0e2",
      main: "#337066",
      dark: "#7d6d99",
      contrastText: "#fff",
    },
    secondary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#648dae",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UsersProvider>
        <div className="App">
          <div className="header"></div>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/main-page/*" element={<MainPage />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </UsersProvider>
    </ThemeProvider>
  );
}

export default App;

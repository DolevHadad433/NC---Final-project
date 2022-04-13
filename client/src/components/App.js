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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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

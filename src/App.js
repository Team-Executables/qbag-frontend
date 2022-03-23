import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import ForgotPassword from "./components/forgotpassword";
import ResetPassword from "./components/resetpassword";
import NotFound from "./components/NotFound";
import Navbar from "./components/navbar/navbar";
import AddQuestion from "./components/AddQuestion";

// MUI
import { teal, amber } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: amber[500],
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          }
        >
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="search-questions" element={<div>search-question</div>} />
          <Route path="generate-paper" element={<div>generate-paper</div>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password%3ftoken_valid%3dTrue%26message%3dCredentials_Valid/:uidb64/:token"
          element={<ResetPassword />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

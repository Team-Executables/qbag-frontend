import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../../atoms";
import LMenu from "./loggedInMenu";

//MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const drawerWidth = 240;

const classes = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
};

export default function Navbar({ handleDrawerToggle }) {
  const login = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();
  console.log(window.location);
  return (
    <div sx={classes.root}>
      <AppBar
        position="static"
        sx={
          window.location.pathname.match("/dashboard/question")
            ? {
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }
            : {}
        }
      >
        <Toolbar>
          {login ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}

          <IconButton
            edge="start"
            sx={classes.menuButton}
            color="inherit"
            aria-label="logo"
            onClick={() => navigate("/")}
          >
            <MenuBookIcon style={{ fontSize: 30 }} />
          </IconButton>
          <Typography variant="h6" sx={classes.title}>
            QBaG
          </Typography>
          {login ? (
            <LMenu />
          ) : (
            <>
              <Box mr={1}>
                <Button variant="outlined" color="inherit" href="/register">
                  Register
                </Button>
              </Box>
              <Button variant="outlined" color="inherit" href="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

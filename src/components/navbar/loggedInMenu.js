import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userData, isLoggedIn } from "../../atoms";
import axiosInstance from "../../axios";
import ChangePassword from "./changePassword";

//MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockIcon from "@mui/icons-material/Lock";
import Logout from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { amber } from "@mui/material/colors";

// Will be displayed after log in
export default function LMenu() {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userData);
  const setLogin = useSetRecoilState(isLoggedIn);

  //Change Password Dialog
  const [openState, setOpenState] = useState(false);
  const openDialog = () => setOpenState(true);
  const closeDialog = () => {
    setOpenState(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    axiosInstance
      .post("auth/logout", {
        refresh: localStorage.getItem("refresh_token"),
      })
      .then((res) => {
        console.log(res);
        setUser({});
        setLogin(false);
        localStorage.clear();
        axiosInstance.defaults.headers["Authorization"] = null;
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ bgcolor: amber[900] }}>
              {user && Object.keys(user).length !== 0 && user.name[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/dashboard/add-question")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <Link
          href={user.idproof}
          color="inherit"
          target="_blank"
          rel="noopener"
          underline="none"
        >
          <MenuItem>
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            View ID Proof
          </MenuItem>
        </Link>
        <MenuItem onClick={openDialog}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Dialogs */}
      <ChangePassword
        open={openState}
        closeDialog={closeDialog}
        title="Change Password"
      />
    </>
  );
}

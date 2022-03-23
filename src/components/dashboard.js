import { useNavigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../atoms";
import { useEffect } from "react";

//MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const buttons = [
  { text: "Add Question", route: "add-question" },
  { text: "Search Questions", route: "search-questions" },
  { text: "Generate Question Paper", route: "generate-paper" },
];

const Dashboard = ({ mobileOpen, handleDrawerToggle }) => {
  const log = useRecoilValue(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!log) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const drawer = (
    <div>
      <Toolbar sx={{ bgcolor: "primary.main" }} />
      <Divider />
      <List>
        {buttons.map((btn, index) => (
          <div key={btn.route}>
            <ListItem
              button
              onClick={() => navigate(`/dashboard/${btn.route}`)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={btn.text} />
            </ListItem>
            {index % 2 !== 0 ? <Divider /> : null}
          </div>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
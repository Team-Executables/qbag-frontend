import { useNavigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn, userData, multilingual } from "../atoms";
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
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';


const drawerWidth = 240;


const Dashboard = ({ mobileOpen, handleDrawerToggle }) => {

    const multi = useRecoilValue(multilingual);
    const buttons = [
        { text: multi.addQuestion, route: "question" },
        { text: multi.searchQuestion, route: "question/search" },
        { text: multi.viewPastPapers, route: "question/paper" },
        { text: "My Templates", route: "question/templates" },
        { text: "My Questions", route: "question/myquestions" },
    ];

    const log = useRecoilValue(isLoggedIn);
    const uData = useRecoilValue(userData);
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
                {uData.user_type === "teacher" ? (
                    buttons.map((btn, index) => (
                        <div key={btn.route}>
                            <ListItem
                                button
                                onClick={() => navigate(`/dashboard/${btn.route}`)}
                            >
                                <ListItemIcon>
                                    { 
                                        index === 0 ? <InboxIcon /> : index === 1 ? <MailIcon /> : index === 2 ? <AssignmentIcon /> : index === 3 ? <BookmarksIcon /> : <ContactSupportIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={btn.text} />
                            </ListItem>
                            {index % 2 === 0 ? <Divider /> : null}
                        </div>
                    ))
                ) : (
                    <>
                        <ListItem
                            button
                            onClick={() => navigate(`/dashboard/${buttons[0].route}`)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={buttons[0].text} />
                        </ListItem>
                        <Divider />
                    </>
                )}
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

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookIcon from "@mui/icons-material/Book";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Theatres from "./componenets/admin/Theatre"; // Corrected path
import Movies from "./componenets/admin/Movie"; // Corrected path
import Shows from "./componenets/admin/shows"; // Corrected path
// Import your custom theme
import theme from "./theme";
import logo from "../src/Assets/logoPT.png";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Define component for each tab
const Dashboard = () => <div>Dashboard Content</div>;
const Bookings = () => <div>Bookings Content</div>;

const AdminDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          {/* Left side navigation bar */}
          <Drawer
            sx={{
              width: "calc(100vw / 6)",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: "calc(100vw / 6)",
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Box>
              <img width={"50%"} src={logo} margin={10} />
            </Box>
            <List>
              {[
                { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
                {
                  text: "Theatres",
                  icon: <LocalMoviesIcon />,
                  path: "/theatres",
                },
                { text: "Movies", icon: <MovieIcon />, path: "/movies" },
                { text: "Shows", icon: <BookIcon />, path: "/shows" },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          {/* Right side view */}
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />

            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/theatres" element={<Theatres />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/shows" element={<Shows />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default AdminDashboard;

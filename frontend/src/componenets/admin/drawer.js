import React from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookIcon from "@mui/icons-material/Book";
import logo from "../../Assets/logoPT.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import logout icon
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("userRole");

    navigate("/admin/login"); // Use React Router for navigation without a full reload
  };

  return (
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
        <img
          width={"50%"}
          src={logo}
          style={{ marginLeft: "40px", marginTop: "20px" }}
          alt="Logo"
        />
      </Box>
      <List>
        {[
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/admin/dashboard",
          },
          {
            text: "Theatres",
            icon: <LocalMoviesIcon />,
            path: "/admin/theatres",
          },
          { text: "Movies", icon: <MovieIcon />, path: "/admin/movies" },
          { text: "Shows", icon: <BookIcon />, path: "/admin/shows" },
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
        <ListItem button onClick={handleLogout} sx={{ mt: 2 }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default SideDrawer;

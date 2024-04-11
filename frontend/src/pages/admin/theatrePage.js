import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import BookIcon from "@mui/icons-material/Book";
import { Box, Toolbar } from "@mui/material";
import Movies from "../../componenets/admin/Movie"; // Corrected path
// Import your custom theme
import theme from "../../theme";
import SideDrawer from "../../componenets/admin/drawer";
import Shows from "../../componenets/admin/shows";
import Theatres from "../../componenets/admin/Theatre";

// Define component for each tab
const Dashboard = () => <div>Dashboard Content</div>;
const Bookings = () => <div>Bookings Content</div>;

const TheatrePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Left side navigation bar */}
        <SideDrawer />
        {/* Right side view */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Theatres />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TheatrePage;

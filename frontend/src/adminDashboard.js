import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box, Toolbar } from "@mui/material";
import theme from "./theme";
import SideDrawer from "./componenets/admin/drawer";

// Define component for each tab
const Dashboard = () => <div>Dashboard Content</div>;
const Bookings = () => <div>Bookings Content</div>;

const AdminDashboard = () => {
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
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;

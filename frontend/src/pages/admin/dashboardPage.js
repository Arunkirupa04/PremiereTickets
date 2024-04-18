import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Toolbar,
  Button,
  Dialog,
} from "@mui/material";
import SideDrawer from "../../componenets/admin/drawer";
import AdminRegister from "./registerPage";
import theme from "../../theme"; // Ensure this is the path to your theme configuration

function AdminDashboard() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <SideDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Button variant="contained" onClick={handleOpen}>
            Add New Admin
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <AdminRegister handleClose={handleClose} />
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;

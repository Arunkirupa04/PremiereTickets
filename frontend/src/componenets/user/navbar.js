import React from "react";
import {
  AppBar,
  TextField,
  Button,
  Stack,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../Assets/logoPT.png";
const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0)", boxShadow: "none" }}
    >
      <Toolbar>
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: 90, marginLeft: "7vw", marginTop: 4 }}
        />
        <Typography
          sx={{
            marginTop: "auto",
            marginLeft: "10px",
            // fontWeight: "500",
            fontSize: 14,
          }}
        >
          | Instant Booking, Endless Movies
        </Typography>
        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Stack direction="row" spacing={5}>
          <Button color="inherit">Movies</Button>
          <Button color="inherit">Genre</Button>
          <Button color="inherit" disabled>
            <SearchIcon />
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

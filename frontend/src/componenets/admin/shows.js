import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ShowForm from "./showForm"; // Import the ShowForm component

import shows from "../../shows.json";
import { Colors } from "../../theme";

const Shows = () => {
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

  const handleOpenUpdate = (theatre) => {
    // Implement logic to open update dialog
    console.log("Open update dialog for theatre:", theatre);
  };

  const handleDelete = (theatreId) => {
    // Implement logic to delete theatre
    console.log("Delete theatre with ID:", theatreId);
  };

  const handleShowForm = () => {
    setShowForm(true); // Set showForm state to true to show the form
    console.log("handle show form");
  };

  const handleCloseForm = () => {
    setShowForm(false); // Set showForm state to false to hide the form
  };

  return (
    <Box>
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent>
          <ShowForm
            theatres={{ name: "PVR" }}
            movies={[{ _id: "001", title: "Hero" }]}
            // onCloseForm={handleCloseForm}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography fontWeight={500} fontSize={20}>
          Shows List
        </Typography>{" "}
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Theatre Chart">
          <TableBody>
            {shows &&
              shows.map((theatre) => (
                <React.Fragment key={theatre._id}>
                  <TableRow sx={{ backgroundColor: Colors.platinum }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6">{theatre.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<AddIcon />}
                        onClick={handleShowForm} // Call handleShowForm when the button is clicked
                      >
                        Add Show
                      </Button>
                    </TableCell>
                  </TableRow>
                  {theatre.movies &&
                    theatre.movies.map((movie, index) => (
                      <TableRow key={movie._id}>
                        <TableCell>{movie.name}</TableCell>
                        <TableCell sx={{ textAlign: "left" }}>
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            onClick={() => handleOpenUpdate(theatre)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            onClick={() => handleDelete(theatre._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  <Divider />
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Conditionally render the ShowForm component */}
      {/* {showForm && (
        <ShowForm
          theatres={[{ name: "PVR" }, { name: "Majestic" }]}
          movies={[{ _id: "001", title: "Hero" }]}
          onCloseForm={handleCloseForm}
        />
      )} */}
    </Box>
  );
};

export default Shows;

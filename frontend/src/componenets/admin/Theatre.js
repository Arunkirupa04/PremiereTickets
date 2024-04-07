import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TheatreForm from "./TheatreForm";
import TheatreUpdate from "./TheatreUpdate";
import {
  getAllTheatres,
  createTheatre,
  updateTheatre,
  deleteTheatre,
} from "../../actions/admin/theatre";
const Theatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const theatreData = await getAllTheatres();
        setTheatres(theatreData.data);
        console.log("Theatres : ", theatres);
      } catch (error) {
        console.error("Error fetching theatres:", error);
      }
    };

    fetchTheatres();
  }, [isModalOpen]);

  const handleOpenUpdate = (theatre) => {
    setSelectedTheatre(theatre);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedTheatre(null);
  };

  const handleUpdateTheatre = async (updatedTheatre) => {
    try {
      await updateTheatre(updatedTheatre._id, updatedTheatre);
      const updatedTheatres = theatres.map((theatre) =>
        theatre._id === updatedTheatre._id ? updatedTheatre : theatre
      );
      setTheatres(updatedTheatres);
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating theatre:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTheatre(id);
      const updatedTheatres = theatres.filter((theatre) => theatre._id !== id);
      setTheatres(updatedTheatres);
    } catch (error) {
      console.error("Error deleting theatre:", error);
    }
  };

  const handleCreateTheatre = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography fontWeight={500} fontSize={20}>
          Theatres List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleCreateTheatre}
          sx={{ marginBottom: 2 }}
        >
          Create New Theatre
        </Button>
      </Stack>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Theatre</DialogTitle>
        <DialogContent>
          <TheatreForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Theatre Chart">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Capacity</TableCell>
              <TableCell align="right">Ticket Price</TableCell>
              <TableCell align="right">Show Times</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {theatres &&
              theatres.map((theatre) => (
                <TableRow key={theatre._id}>
                  <TableCell component="th" scope="row">
                    {theatre.name}
                  </TableCell>
                  <TableCell align="right">{theatre.location}</TableCell>
                  <TableCell align="right">{theatre.capacity}</TableCell>
                  <TableCell align="right">{theatre.ticketPrice}</TableCell>
                  <TableCell align="right">
                    {theatre.showTimes.join(", ")}
                  </TableCell>
                  <TableCell align="right">
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
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTheatre && (
        <TheatreUpdate
          open={openUpdate}
          onClose={handleCloseUpdate}
          theatre={selectedTheatre}
          onUpdate={handleUpdateTheatre}
        />
      )}
    </div>
  );
};

export default Theatres;

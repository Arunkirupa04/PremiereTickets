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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShowForm from "./showForm";
import {
  getAllShowsForTheatre,
  deleteShowForTheatre,
} from "../../actions/admin/show";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const showsData = await getAllShowsForTheatre();
      setShows(showsData.data);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  const handleDelete = async (theatreId, showId) => {
    try {
      await deleteShowForTheatre(theatreId, showId);
      fetchShows();
    } catch (error) {
      console.error("Error deleting show:", error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        sx={{ marginBottom: "20px" }}
      >
        <Typography fontWeight={500} fontSize={20}>
          Shows List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleShowForm}
        >
          Add Show
        </Button>
      </Stack>

      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Add New Show</DialogTitle>
        <DialogContent>
          <ShowForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {shows.map((theatre) => (
        <Accordion key={theatre._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{theatre.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Movie</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {theatre.shows.map((show) => (
                    <TableRow key={show._id}>
                      <TableCell>{show.movie.title}</TableCell>
                      <TableCell>
                        {new Date(show.show.date).toLocaleString("en-US", {
                          year: "numeric",
                          day: "numeric",
                          month: "long",
                        })}
                      </TableCell>
                      <TableCell>{show.show.time}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() =>
                            handleDelete(show.show.theatre, show.show._id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Shows;

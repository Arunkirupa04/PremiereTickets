import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import AdminDashboard from "./adminDashboard";
import Home from "./componenets/user/home";
import ShowsPage from "./componenets/user/ShowPage";
import Theatres from "./componenets/admin/Theatre"; // Corrected path
import Movies from "./componenets/admin/Movie"; // Corrected path
import Shows from "./componenets/admin/shows"; // Corrected path
import MoviePage from "./pages/admin/moviePage";
import TheatrePage from "./pages/admin/theatrePage";
import ShowPage from "./pages/admin/showPage";
import ShowPageUser from "./componenets/user/ShowPage";
import SeatingPatternCreator from "./componenets/admin/theatreSeat";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Route to Admin Dashboard */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Route to Home Page */}
          <Route path="/" element={<Home />} />

          {/* Route to Shows Page (Nested under Home) */}
          <Route path="/admin/shows" element={<ShowPage />} />
          {/* <Route exact path="/admin/" element={<Dashboard />} /> */}
          <Route path="/admin/theatres" element={<TheatrePage />} />
          <Route path="/admin/movies" element={<MoviePage />} />
          <Route path="/showPage/:movieId" element={<ShowPageUser />} />
          <Route path="/seat" element={<SeatingPatternCreator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

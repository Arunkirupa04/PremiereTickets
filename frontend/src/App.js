import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { StripeProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import theme from "./theme";
import AdminDashboard from "./adminDashboard";
import Home from "./componenets/user/home";
import MoviePage from "./pages/admin/moviePage";
import TheatrePage from "./pages/admin/theatrePage";
import ShowPage from "./pages/admin/showPage";
import ShowPageUser from "./componenets/user/ShowPage";
import SeatingPatternCreator from "./componenets/admin/theatreSeat";
import SeatingPage from "./componenets/user/seatingPage";
import PaymentForm from "./componenets/user/payment";
import DisclaimerPage from "./componenets/user/disclaimerPage";
import SuccessPage from "./componenets/user/bookingSuccess";

const stripePromise = loadStripe(
  "pk_test_51P4oPJ1OuO8iFaOrgbO8LjpEb1zFgbnR4iCIsxbwAALLYlxoof5C3JV1cty9SqhYTUbzFjOap8S7ZTtzt2R5GDQk00MFNtTDZ5"
); // Replace with your Stripe publishable key

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />

          <Route path="/" element={<Home />} />

          {/* Route to Shows Page (Nested under Home) */}
          <Route path="/admin/shows" element={<ShowPage />} />
          {/* <Route exact path="/admin/" element={<Dashboard />} /> */}
          <Route path="/admin/theatres" element={<TheatrePage />} />
          <Route path="/admin/movies" element={<MoviePage />} />
          <Route path="/showPage/:movieId" element={<ShowPageUser />} />
          <Route path="/seating/:theatreId" element={<SeatingPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/seat" element={<SeatingPatternCreator />} />
          <Route path="/success" element={<SuccessPage />} />

          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

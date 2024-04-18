import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { StripeProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import theme from "./theme";
import AdminDashboard from "./pages/admin/dashboardPage";
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
import ContactDetails from "./componenets/user/otpVarification";
import ProtectedRoute from "./protecedRoutes";
import AdminLogin from "./pages/admin/loginPage";
import AdminRegister from "./pages/admin/registerPage";

const stripePromise = loadStripe(
  "pk_test_51P4oPJ1OuO8iFaOrgbO8LjpEb1zFgbnR4iCIsxbwAALLYlxoof5C3JV1cty9SqhYTUbzFjOap8S7ZTtzt2R5GDQk00MFNtTDZ5"
); // Replace with your Stripe publishable key

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="shows" element={<ShowPage />} />
            <Route path="theatres" element={<TheatrePage />} />
            <Route path="movies" element={<MoviePage />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/showPage/:movieId" element={<ShowPageUser />} />
          <Route path="/seating/:theatreId" element={<SeatingPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          {/* <Route path="/seat" element={<SeatingPatternCreator />} /> */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<ContactDetails />} />
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

import { ThemeProvider } from "@emotion/react";
import "./App.css";
import AdminDashboard from "./adminDashboard";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  BrowserRouter,
} from "react-router-dom";
import Home from "./componenets/user/home";
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <AdminDashboard /> */}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={Home} />
          </Routes>
        </BrowserRouter>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;

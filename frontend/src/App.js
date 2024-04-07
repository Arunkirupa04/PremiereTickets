import { ThemeProvider } from "@emotion/react";
import "./App.css";
import AdminDashboard from "./adminDashboard";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AdminDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;

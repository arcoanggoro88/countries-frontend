import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/app-router";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

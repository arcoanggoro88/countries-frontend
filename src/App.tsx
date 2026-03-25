import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/app-router";
import { ThemeProvider } from "./wrapper/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

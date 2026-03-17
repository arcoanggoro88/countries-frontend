import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/dashboard" Component={Dashboard} />
    </Routes>
  );
};

export default AppRoutes;

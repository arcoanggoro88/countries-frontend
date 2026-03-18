import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import VerificationOTP from "../pages/verifyOtp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/verify-otp" Component={VerificationOTP} />
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/dashboard" Component={Dashboard} />
      <Route path="/verify-otp" Component={VerificationOTP} /> */}
      <Route path="/" Component={Dashboard} />
    </Routes>
  );
};

export default AppRoutes;

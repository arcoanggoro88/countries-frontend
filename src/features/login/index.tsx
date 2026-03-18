import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import AuthWrapper from "../../wrapper/authWrapper";
import { useRef } from "react";
import axios from "axios";

const LoginComponent = () => {
  const navigate = useNavigate();
  const inEmailRef = useRef<HTMLInputElement | null>(null);
  const inPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const email = inEmailRef.current?.value;
    const password = inPasswordRef.current?.value;
    if (!email || !password) return alert("Required all fields");

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };
  return (
    <AuthWrapper>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm space-y-6">
          <header className="flex flex-col items-center space-y-2 text-center">
            <span className="text-3xl sm:text-4xl">🙌</span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Welcome <span className="text-blue-500">Back</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please login to your account
            </p>
          </header>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                ref={inEmailRef}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                ref={inPasswordRef}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Button */}
            <Button
              type="button"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginComponent;

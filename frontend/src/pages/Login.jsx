import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError("Email and password are required");

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || "Something went wrong");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* More solid background for visibility */}
        <Card className="rounded-2xl shadow-2xl backdrop-blur-lg bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-extrabold text-gray-900 drop-shadow">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 text-base font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email..."
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="rounded-xl px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800 text-base font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password..."
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="rounded-xl px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 text-lg"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-5">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform text-lg"
              >
                Login
              </Button>
              <p className="text-center text-base text-gray-800 font-medium">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-indigo-600 hover:underline hover:text-indigo-800 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Login;

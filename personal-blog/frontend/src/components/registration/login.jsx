import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import bgImage from "../assets/bg.png";

export default function Login() {
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        storeTokenInLS(data.token);
        navigate("/");
        toast.success(data.message || "Login succeeded");
        setForm({ username: "", password: "" });
      } else {
        console.log(data.message);
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-6xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Image with Overlay */}
        <div className="hidden md:block md:w-1/2 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl mb-8">
              Ready to continue your blogging journey?
            </p>
            <div className="mt-8">
              <p className="mb-4">Don't have an account?</p>
              <Link
                to="/register"
                className="inline-block px-6 py-3 border-2 border-white rounded-lg text-white font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 py-12 px-8 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Login to Your Account
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="#"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <LoadingSpinner /> : "Login"}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>

          <div className="mt-6 text-center md:hidden">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

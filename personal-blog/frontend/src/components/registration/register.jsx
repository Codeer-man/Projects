import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/bg.png";

export default function Register() {
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_USER_REGISTER
  } `;

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "New User has been created");
        navigate("/login");
        setRegister({
          username: "",
          email: "",
          password: "",
        });
      } else {
        setError(data.error);
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-6xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden flex">
        {/* Left Side  */}
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
            <h1 className="text-4xl font-bold mb-6">Join Our Community!</h1>
            <p className="text-xl mb-8">
              Start your blogging journey with us today
            </p>
            <div className="mt-8">
              <p className="mb-4">Already have an account?</p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 border-2 border-white rounded-lg text-white font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 py-12 px-8 md:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-600 mt-2">
              Fill in your details to get started
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
                value={register.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={register.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                placeholder="Enter your email"
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
                value={register.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-300"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={termsAccepted}
                onChange={handleTermsChange}
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <Link to="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !termsAccepted} // Disable if not accepted
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ${
                  loading || !termsAccepted
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? <LoadingSpinner /> : "Register"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

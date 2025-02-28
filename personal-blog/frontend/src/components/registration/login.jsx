import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

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
        setForm({ username: "", password: "" });
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
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
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={form.username}
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={form.password}
          name="password" 
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

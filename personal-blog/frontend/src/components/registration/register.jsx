import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
          usename: "",
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

  return (
    <div>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">UserName</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={register.username}
          onChange={handleChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={register.email}
          onChange={handleChange}
        />
        <label htmlFor="Password">password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={register.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "registering..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

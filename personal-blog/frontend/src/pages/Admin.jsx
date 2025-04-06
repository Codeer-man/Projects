import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Admin() {
  const navigate = useNavigate();
  const { user, loggedIn } = useAuth();
  const [users, setAllUser] = useState([]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
      toast.error("Please login first");
    } else if (user.data.role !== "Admin") {
      navigate("/");
      toast.error("Only admin are allowed in the page");
    }
  }, [loggedIn]);

  if (!loggedIn || !user?.data.role !== "Admin") return null;

  useEffect(() => {
    const AllUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("User Data could not found");
          return null;
        }
        const data = await response.json();
        setAllUser(data.data);
        console.log(users);
      } catch (error) {
        console.error("Invalise server error");
        throw new Error(error);
      }
    };
    AllUser();
  });

  return (
    <div className="h-screen">
      <div></div>
      Hello world
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/registration/logout";
import { useAuth } from "../store/auth";

export default function Profile() {
  const { author } = useAuth();
  console.log(author);

  return (
    <div>
      <Link to={`/MyBlog/${author}`}>My Blogs</Link>
      <Logout />
    </div>
  );
}

import React, { Component } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/updatePost";
// Component
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// not found
import NotFound from "./pages/notfound";
// registration
import Login from "./components/registration/login";
import Register from "./components/registration/register";
import Logout from "./components/registration/logout";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog-post" element={<BlogPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/view-post/:id" element={<ViewPost />} />
        <Route path="/blog/:id/update" element={<EditPost />} />
        {/* registration  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        {/* not fount  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

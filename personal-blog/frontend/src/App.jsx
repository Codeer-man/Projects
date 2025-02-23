import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Post from "./pages/Post";
import Update from "./pages/updatePost";

import NotFound from "./pages/notfound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/api/blog/:id/update" element={<Update />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

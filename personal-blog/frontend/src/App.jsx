import React from "react";
// import {Helmet} from "react-helmet"
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components for routing
import Signup from "./components/Signup";  
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

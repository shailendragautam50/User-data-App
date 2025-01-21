import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    profilePicture: null, // Added for media upload
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataWithFile.append(key, formData[key]);
      });

      const response = await axios.post(`${API_URL}/signup`, formDataWithFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;

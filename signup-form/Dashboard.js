import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Dashboard() {
  const [userData, setUserData] = useState(null); // To store user details
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to login if no token
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
        setUserData(response.data.user); // Set user data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
        localStorage.removeItem("token"); // Clear token if invalid
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <h1>Loading Dashboard...</h1>; // Show loading state
  }

  if (error) {
    return <h1>Error: {error}</h1>; // Show error message
  }

  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      <p>Email: {userData.email}</p>
      <p>City: {userData.city}</p>
      <p>Mobile Number: {userData.mobileNumber}</p>
      <p>Profile Picture:</p>
      {userData.profilePicture && (
        <img
          src={`http://localhost:5000${userData.profilePicture}`}
          alt="Profile"
          width="150"
        />
      )}
    </div>
  );
}

export default Dashboard;

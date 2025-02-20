import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getuser", { gmail: email });
      setUserData(response.data);
      setError("");
    } catch (err) {
      setUserData(null);
      setError("User not found or an error occurred.");
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Enter an email to fetch user details:</p>

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter user email..." required />
      <button onClick={fetchUserData}>Get User Info</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.gmail}</p>
          <p><strong>Study:</strong> {userData.study}</p>
          {userData.photo ? (
            <img src={userData.photo} alt="User" width="150" style={{ borderRadius: "50%" }} />
          ) : (
            <p>No photo available</p>
          )}
        </div>
      )}

      <button onClick={() => window.location.reload()}>Back to Home</button>
    </div>
  );
}

export default Admin;

import { useState } from "react";
import axios from "axios";
import "./App.css";
import Admin from "./Admin"; // Import the Admin component

function App() {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [study, setStudy] = useState("");
  const [photo, setPhoto] = useState(null); // Store file, not URL
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please choose a photo!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gmail", gmail);
    formData.append("study", study);
    formData.append("photo", photo); // Attach file

    try {
      const response = await axios.post("http://localhost:5000/adduser", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Application submitted successfully:", response.data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (showAdmin) {
    return <Admin />;
  }

  return (
    <>
      <button className="admin-button" onClick={() => setShowAdmin(true)}>
        Admin
      </button>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Application Form</h1>
          <h2>Enter Your Name:</h2>
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name..." required />
          <h2>Enter Your Email ID:</h2>
          <input type="email" onChange={(e) => setGmail(e.target.value)} placeholder="Enter Your Email..." required />
          <h2>Enter Your Study Field:</h2>
          <input type="text" onChange={(e) => setStudy(e.target.value)} placeholder="Enter Your Study Field..." required />
          <h2>Choose Your Photo:</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Your application has been submitted successfully!</h2>
          <p>Thank you for submitting your application.</p>
        </div>
      )}
    </>
  );
}

export default App;

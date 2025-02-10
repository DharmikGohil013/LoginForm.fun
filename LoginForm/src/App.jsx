import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [study, setStudy] = useState('');
  const [college, setCollege] = useState('');
  
  // State to track whether the user has successfully signed up
  const [isSignedUp, setIsSignedUp] = useState(false);

  // State to track login form visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle Sign-up form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/adduser', {
        Name: name,
        Password: password,
        Email: email,
        Pincode: pincode,
        Study: study,
        College: college,
      });
      console.log('User added successfully');
      setIsSignedUp(true);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Handle Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        Email: email,
        Password: password,
      });
      console.log(response.data);
      setIsLoggedIn(true); // User is logged in

      // Redirect to the home page (or show a success message)
      alert('Login Successful! Redirecting to home...');
      // You can use window.location to redirect
      // window.location.href = "/home"; // You can replace this with the actual home page URL.
    } catch (err) {
      console.error('Error:', err);
      alert('Invalid credentials, please try again.');
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        !isSignedUp ? (
          // Signup Form
          <form onSubmit={handleSubmit}>
            <h1>Signup Form</h1>
            <h2>Enter Your Name:</h2>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name..."
            />
            <h2>Enter Your Email ID:</h2>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
            />
            <h2>Enter Your Pincode:</h2>
            <input
              type="text"
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Your Pincode..."
            />
            <h2>Enter Your Study:</h2>
            <input
              type="text"
              onChange={(e) => setStudy(e.target.value)}
              placeholder="Enter Your Study Field..."
            />
            <h2>Enter Your College/School Name:</h2>
            <input
              type="text"
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Enter Your College/School..."
            />
            <h2>Enter Your Password:</h2>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password..."
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          // Login Form after successful signup
          <form onSubmit={handleLoginSubmit}>
            <h1>Login Form</h1>
            <h2>Enter Your Email ID:</h2>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
            />
            <h2>Enter Your Password:</h2>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password..."
            />
            <button type="submit">Login</button>
          </form>
        )
      ) : (
        <h2>Welcome to the Home Page!</h2> // This can be the home page after login
      )}
    </>
  );
}

export default App;

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'LoginWithName';
const client = new MongoClient(url);

app.use(cors());
app.use(express.json());

// Signup Route (already present)
app.post('/adduser', async (req, res) => {
  const { Name, Password, Email, Pincode, Study, College } = req.body;

  if (!Name || !Password || !Email || !Pincode || !Study || !College) {
    return res.status(400).send('All fields are required');
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('topic'); // Changed collection name to 'users'

    const document = await collection.insertOne({ Name, Password, Email, Pincode, Study, College });

    if (document.acknowledged) {
      res.status(200).send('User added successfully');
    } else {
      res.status(400).send('Failed to insert data');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send('Email and Password are required');
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('topic');

    // Find user by email and password
    const user = await collection.findOne({ Email, Password });

    if (user) {
      // Login successful
      res.status(200).send('Login successful');
    } else {
      // Invalid credentials
      res.status(400).send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

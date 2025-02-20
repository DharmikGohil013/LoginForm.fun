const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 5000;

const url = "mongodb://127.0.0.1:27017/";
const dbName = "LoginWithName";
const client = new MongoClient(url);

app.use(cors());
app.use(express.json());

// Fetch User by Email
app.post("/getuser", async (req, res) => {
  const { gmail } = req.body;

  if (!gmail) {
    return res.status(400).send("Email is required");
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Find user by email
    const user = await collection.findOne({ gmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

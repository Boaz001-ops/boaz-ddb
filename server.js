<<<<<<< HEAD
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to local file where users will be saved
const USERS_FILE = "./users.json";

// Load existing users or start with an empty list
let users = [];
if (fs.existsSync(USERS_FILE)) {
  const data = fs.readFileSync(USERS_FILE, "utf8");
  try {
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }
}

// ✅ Endpoint for sign-up (saving user data)
app.post("/signup", (req, res) => {
  const { firstName, lastName, phone, password } = req.body;

  if (!firstName || !lastName || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Check if the phone already exists
  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return res.json({ success: false, message: "Phone number already registered." });
  }

  // Save new user
  const newUser = { firstName, lastName, phone, password };
  users.push(newUser);

  // Write to local file
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true, message: "Account created successfully!" });
});

// ✅ Endpoint for login (verifying saved data)
app.post("/login", (req, res) => {
  const { phone, password } = req.body;

  const user = users.find(u => u.phone === phone && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid phone number or password." });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
=======
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to local file where users will be saved
const USERS_FILE = "./users.json";

// Load existing users or start with an empty list
let users = [];
if (fs.existsSync(USERS_FILE)) {
  const data = fs.readFileSync(USERS_FILE, "utf8");
  try {
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }
}

// ✅ Endpoint for sign-up (saving user data)
app.post("/signup", (req, res) => {
  const { firstName, lastName, phone, password } = req.body;

  if (!firstName || !lastName || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Check if the phone already exists
  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return res.json({ success: false, message: "Phone number already registered." });
  }

  // Save new user
  const newUser = { firstName, lastName, phone, password };
  users.push(newUser);

  // Write to local file
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true, message: "Account created successfully!" });
});

// ✅ Endpoint for login (verifying saved data)
app.post("/login", (req, res) => {
  const { phone, password } = req.body;

  const user = users.find(u => u.phone === phone && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid phone number or password." });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

>>>>>>> 0cabdbe2b46b56175df393d276558b5a44a9f1d6

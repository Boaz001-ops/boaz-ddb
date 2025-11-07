const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve all files in the current folder (HTML, CSS, JS, etc.)
app.use(express.static(__dirname));

// Path to the users file
const USERS_FILE = path.join(__dirname, "users.json");

// Load users
let users = [];
if (fs.existsSync(USERS_FILE)) {
  const data = fs.readFileSync(USERS_FILE, "utf8");
  try {
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }
}

// ✅ Sign-up endpoint
app.post("/signup", (req, res) => {
  const { firstName, lastName, phone, password } = req.body;

  if (!firstName || !lastName || !phone || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return res.json({ success: false, message: "Phone number already registered." });
  }

  const newUser = { firstName, lastName, phone, password };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true, message: "Account created successfully!" });
});

// ✅ Login endpoint
app.post("/login", (req, res) => {
  const { phone, password } = req.body;
  const user = users.find(u => u.phone === phone && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid phone number or password." });
  }
});

// ✅ Serve your main page when visiting root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // or "main.HTML" if that’s your filename
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname))); // Serves all HTML, CSS, JS files
app.use(bodyParser.json());

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log("New signup:", username, password);
  res.send("Signup received successfully!");
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);
  res.send("Login successful!");
});

// Serve index.html as the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

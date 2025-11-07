const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML files directly

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  // Example check (you can replace this with real validation)
  if (username === "admin" && password === "1234") {
    return res.send("✅ Login successful!");
  } else {
    return res.send("❌ Invalid username or password.");
  }
});

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log("Signup data:", username, password);
  res.send("✅ Signup successful (dummy response)");
});

// Always serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

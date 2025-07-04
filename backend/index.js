const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
app.get("/greet", (req, res) => {
  const name = req.query.name || "Mundo";
  res.json({
    message: `¡Hola, ${name}!`
  });
});
// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));

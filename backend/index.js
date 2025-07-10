const express = require("express");
const db = require("./db");

// Define express app
const app = express();
// Cambié el puerto del backend de 3000 a 4000 como pide la Tarea 3
const port = 4000;

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
/*Tarea 01
Esta ruta responde a /greet?name=... y devuelve un mensaje en formato JSON*/
app.get("/greet", (req, res) => {
  // Obtiene el parámetro 'name' de la query string
  const name = req.query.name || "Mundo";
  // Devuelve un objeto JSON con el saludo personalizado
  res.json({
    message: `¡Hola, ${name}!`
  });
});

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));

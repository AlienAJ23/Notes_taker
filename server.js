const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));

// JSON Server routes
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonServer.bodyParser, router);

// React app fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

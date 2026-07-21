const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const dns = require("node:dns").promises;
// use Cloudflare DNS to avoid SRV lookup issues in some networks
dns.setServers(["1.1.1.1", "1.0.0.1"]);
require("dotenv").config();
const bookRoutes = require("./routes/book.routes");

app.use(express.json());

// Middleware to use book routes
app.use("/books", bookRoutes);

// Server listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// MongoDB connection
const connectionString = process.env.CONNECT_STRING;

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

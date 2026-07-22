const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const dns = require("node:dns").promises;

// Language support and translation
const i18next = require("i18next");
const middleware = require("i18next-http-middleware");
const backend = require("i18next-fs-backend");

// use Cloudflare DNS to avoid SRV lookup issues in some networks
dns.setServers(["1.1.1.1", "1.0.0.1"]);
require("dotenv").config();
const bookRoutes = require("./routes/book.routes");

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "locales/{{lng}}.json",
    },
  });

app.use(middleware.handle(i18next));

// app.get("/testing", async (req, res) => {
//   const message = req.t("testing");
//   res.send(message);
// });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Management API is running");
});

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

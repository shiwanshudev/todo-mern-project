// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todosRoute = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

// DB Configuration
dotenv.config();
mongoose
  .connect(process.env.DB_URI)
  .catch((error) => console.log("Error connecting to the database!", error));

// Enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Setting up routes
app.use("/todos", todosRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});

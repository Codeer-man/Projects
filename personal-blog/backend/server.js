require("dotenv").config();
// const { log } = require("console");
const express = require("express");
const cors = require("cors");
const path = require("path");
// const { default: mongoose } = require("mongoose");
const ConnectDB = require("./utils/ConnectDB");
const errorhandling = require("./middleware/errorhandling-middleware");
const route = require("./routes/BlodPost-route");

const app = express();

// cors config middleware
const corpsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credential: true,
  allowedHeaders: ["Content-Type : Application/json"],
};
app.use(cors(corpsOptions));

// connect to database
ConnectDB();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", route);

app.use(errorhandling);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port is running in ${PORT}`);
});

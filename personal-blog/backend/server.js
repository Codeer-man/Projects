require("dotenv").config();
// const { log } = require("console");
const express = require("express");
// cookie
const cookieParser = require("cookie-parser");
// const { cookies } = require("next/headers");

// Corss origin resourse sharing
const cors = require("cors");

// path
const path = require("path");

// connect to db
const ConnectDB = require("./utils/ConnectDB");

// error handling middleware  // middleware to handle errors in the application
const errorhandling = require("./middleware/errorhandling-middleware");
// Routes
const blogRoute = require("./routes/BlodPost-route");
const authRoute = require("./routes/auth-route");

// passport import
const passport = require("./config/passport");
// const { default: mongoose } = require("mongoose");

const app = express();

// cors config middleware
const corpsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
  allowedHeaders: ["Content-Type : Application/json"],
};
app.use(cors(corpsOptions));

// connect to database
ConnectDB();

// middleware
app.use(express.json());

// path
app.use(express.static(path.join(__dirname, "public")));
// cookie
app.use(cookieParser());

// express-session

// passport above routes under express-session
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/api/blog", blogRoute);
app.use("/api/auth", authRoute);

// error handling
app.use(errorhandling);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port is running in ${PORT}`);
});

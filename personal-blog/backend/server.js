require("dotenv").config();
// require("./passport")(passport);

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
const profileRoute = require("./routes/profile-route");

// passport import
const passport = require("./config/passport");
// const { default: mongoose } = require("mongoose");

// session
const session = require("express-session");

const app = express();
// cookie
app.use(cookieParser());

// cors config middleware
const corpsOptions = {
  origin: " http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  Credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corpsOptions));
// app.options("*", cors());

// connect to database
ConnectDB();

// middleware
app.use(express.json());

// path
app.use(express.static(path.join(__dirname, "public")));

// express-session
app.use(
  session({
    secret: process.env.session_secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  })
);

// passport above routes under express-session
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// router
app.use("/api/blog", blogRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);

// error handling
app.use(errorhandling);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port is running in ${PORT}`);
});

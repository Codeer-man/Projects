const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/auth-model");
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, findUser, { message: "Found User" });
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
module.exports = passport;

// In the above code, passport-local is used for local authentication, where users provide their email and password. The strategy is configured to use the email field for username. The callback function checks if the user exists in the database, and if the password matches the stored hash. If the credentials are valid, the user is authenticated and passed to the next middleware function. If not, appropriate error messages are returned.

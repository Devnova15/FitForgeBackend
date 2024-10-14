const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const getConfigs = require("../config/getConfigs");
const keys = require("./keys.js");

module.exports = async (passport) => {
  const opts = {};
  const configs = await getConfigs();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = keys.secretOrKey;

  passport.use(
    "jwt",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .select("-password")
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }),
  );

  passport.use(
    "jwt-admin",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .select("-password")
        .then((user) => {
          if (user && user.isAdmin) {
            return done(null, user);
          }
          return done(null, false, {
            message: "You do not have enough permissions for this operation",
          });
        })
        .catch((err) => console.log(err));
    }),
  );
};

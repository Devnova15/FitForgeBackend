const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const passport = require("passport");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);

// Load User model
const User = require("../models/User");
const Award = require("../models/Award");

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");

// Load helper for creating correct query to save user to DB
const queryCreator = require("../commonHelpers/queryCreator");

// Controller for creating user and saving to DB
exports.createUser = (req, res, next) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    $or: [{ email: req.body.email }, { login: req.body.login }],
  })
    .then((user) => {
      if (user) {
        if (user.email === req.body.email) {
          return res
            .status(400)
            .json({ message: `Email ${user.email} already exists"` });
        }

        if (user.login === req.body.login) {
          return res
            .status(400)
            .json({ message: `Login ${user.login} already exists` });
        }
      }

      // Create query object for user for saving him to DB
      const newUser = new User(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            res
              .status(400)
              .json({ message: `Error happened on server: ${err}` });

            return;
          }

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              }),
            );
        });
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

// Controller for user login
exports.loginUser = async (req, res, next) => {
  const { errors, isValid } = validateRegistrationForm(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;
  const configs = await getConfigs();

  // Find user by email
  User.findOne({
    $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
  })
    .then((user) => {
      // Check for user
      if (!user) {
        errors.loginOrEmail = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            },
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

// Controller for editing user personal info
exports.editUserInfo = (req, res) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        errors.id = "User not found";
        return res.status(404).json(errors);
      }

      const currentEmail = user.email;
      const currentLogin = user.login;
      let newEmail;
      let newLogin;

      if (req.body.email) {
        newEmail = req.body.email;

        if (currentEmail !== newEmail) {
          User.findOne({ email: newEmail }).then((user) => {
            if (user) {
              errors.email = `Email ${newEmail} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      if (req.body.login) {
        newLogin = req.body.login;

        if (currentLogin !== newLogin) {
          User.findOne({ login: newLogin }).then((user) => {
            if (user) {
              errors.login = `Login ${newLogin} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      // Create query object for user for saving him to DB
      const updatedUser = queryCreator(initialQuery);

      User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updatedUser },
        { new: true },
      )
        .then((user) => res.json(user))
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          }),
        );
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `,
      }),
    );
};

// Controller for editing user password
exports.updatePassword = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find our user by ID
  User.findOne({ _id: req.user.id }, (err, user) => {
    let oldPassword = req.body.password;

    user.comparePassword(oldPassword, function (err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            User.findOneAndUpdate(
              { _id: req.user.id },
              {
                $set: {
                  password: newPassword,
                },
              },
              { new: true },
            )
              .then((user) => {
                res.json({
                  message: "Password successfully changed",
                  user: user,
                });
              })
              .catch((err) =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `,
                }),
              );
          });
        });
      }
    });
  });
};

// Controller for getting existing user
exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-login -password")
    .populate("awards")
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `User with id "${req.params.id}" is not found.`,
        });
      } else {
        res.json(user);
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.addAwardToUser = async (req, res, next) => {
  let awardToAdd;

  try {
    awardToAdd = await Award.findOne({ _id: req.params.awardId });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }

  if (!awardToAdd) {
    res.status(404).json({
      message: `Award with id "${req.params.awardId}" is not found.`,
    });
  } else {
    User.findOne({ _id: req.user.id })
      .then((user) => {
        if (user.awards.includes(req.params.awardId)) {
          res.status(400).json({
            message: `Award with _id "${req.params.awardId}" already at users award list.`,
          });

          return;
        }
        user.awards = user.awards.concat(req.params.awardId);
        const updatedUser = queryCreator(user);

        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: updatedUser },
          { new: true },
        )
          .populate("awards")
          .then((user) => res.json(user))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );
      })
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        }),
      );
  }
};

exports.deleteAwardFromUser = async (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: `User not found` });
      } else {
        if (!user.awards.includes(req.params.awardId)) {
          res.status(400).json({
            message: `Award with _id "${req.params.awardId}" is absent at users award list.`,
          });

          return;
        }

        user.awards = user.awards.filter(
          (elem) => elem.toString() !== req.params.awardId,
        );

        const updatedUser = queryCreator(user);

        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: updatedUser },
          { new: true },
        )
          .populate("awards")
          .then((user) => res.json(user))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

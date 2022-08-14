const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    UserModel.checkIsExistingUser(req.body.email, async (err, user) => {
      if (!err) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid credentials." });
      } else {
        bcrypt.compare(req.body.password, user[0]?.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user?.email,
                userId: user?.id,
              },
              "secret",
              (err, token) => {
                return res.status(200).send({
                  message: "Logged in",
                  token,
                });
              }
            );
          } else {
            return res
              .status(400)
              .send({ success: false, message: "Invalid credentials." });
          }
        });
      }
    });
  }
};

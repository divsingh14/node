const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

exports.getUsers = (req, res) => {
  UserModel.getUsers((err, users) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(users);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  UserModel.getUserById(id, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(user);
  });
};

exports.addUser = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    UserModel.checkIsExistingUser(req.body.email, async (err, user) => {
      if (err) {
        return res
          .status(400)
          .send({ success: false, message: "User already exist." });
      }
      const salt = await bcrypt.genSalt(5);
      const password = await bcrypt.hash(req.body.password, salt);

      const userRequest = new UserModel({ ...req.body, password });
      UserModel.addUser(userRequest, (err, user) => {
        if (err) {
          res.send(err);
          res.json({ success: false, message: "Something went wrong." });
          return;
        }
        res.send(user);
      });
    });
  }
};

// exports.updateEvent = (req, res) => {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ success: false, message: "Please fill all the fields." });
//   } else {
//     const eventRequest = new EventModel(req.body);
//     const { id } = req.params;
//     EventModel.updateEvent(eventRequest, id, (err, event) => {
//       if (err) {
//         res.send(err);
//         res.json({ success: false, message: "Something went wrong." });
//         return;
//       }
//       res.send(event);
//     });
//   }
// };

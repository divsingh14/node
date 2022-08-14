const dbConnection = require("../utils/database");

let User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.contact_no = user.contact_no;
  this.password = user.password;
  this.is_active = user.is_active ?? true;
  this.role_id = user.role_id ?? 2;
  this.created_on = new Date();
};

User.getUsers = (result) => {
  dbConnection.query("SELECT * FROM users", (err, res) => {
    if (err) {
      result(null, res);
      return;
    }
    result(null, res);
  });
};

User.getUserById = (id, result) => {
  dbConnection.query("SELECT * FROM users WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching user", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

User.addUser = (req, result) => {
  dbConnection.query("INSERT INTO users SET ?", req, (err, res) => {
    if (err) {
      result(null, { status: false, message: err });
      return;
    }
    result(null, { status: true, message: "User saved successfully!!!" });
  });
};

User.updateUser = (req, id, result) => {
  const {
    first_name,
    last_name,
    email,
    contact_no,
    password,
    is_active,
    role_id,
  } = req;

  dbConnection.query(
    "UPDATE users SET first_name=?, last_name=?, email=?, contact_no=?, password=?, is_active=?, role_id=? WHERE id=?",
    [
      first_name,
      last_name,
      email,
      contact_no,
      password,
      is_active,
      role_id,
      id,
    ],
    (err, res) => {
      if (err) {
        result(null, { status: false, message: err });
        return;
      }
      result(null, { status: true, message: "User updated successfully." });
    }
  );
};

User.checkIsExistingUser = (email, result) => {
  dbConnection.query(
    "SELECT * FROM users WHERE email=? ",
    email,
    (err, res) => {
      if (res?.length === 0) return result(false, res);
      return result(true, res);
    }
  );
};

module.exports = User;

const mySQL = require("mysql");

const dbConnection = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "classready",
});

dbConnection.connect((error) => {
  if (error) throw error;

  console.log("Connected with DB");
});

module.exports = dbConnection;

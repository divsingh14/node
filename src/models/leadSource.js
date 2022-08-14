const dbConnection = require("../utils/database");

let LeadSource = function (leadSource) {
  this.source_name = leadSource.source_name;
  this.email = leadSource.email;
  this.contact_no = leadSource.contact_no;
  this.logo_path = leadSource.logo_path;
  this.created_on = leadSource.created_on;
};

LeadSource.getLeadSources = (result) => {
  dbConnection.query("SELECT * FROM lead_source", (err, res) => {
    if (err) {
      console.log("Error while fetching lead_source", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

LeadSource.getLeadSourceById = (id, result) => {
  dbConnection.query("SELECT * FROM lead_source WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching lead_source", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

LeadSource.addLeadSource = (req, result) => {
  dbConnection.query("INSERT INTO lead_source SET ?", req, (err, res) => {
    if (err) {
      result(null, { status: false, message: err });
      return;
    }
    result(null, {
      status: true,
      message: "Lead Source saved successfully.",
    });
  });
};

LeadSource.updateLeadSource = (req, id, result) => {
  const { source_name, email, contact_no, logo_path } = req;

  dbConnection.query(
    "UPDATE lead_source SET source_name=?,email=?,contact_no=?,logo_path=? WHERE id=?",
    [source_name, email, contact_no, logo_path, id],
    (err, res) => {
      if (err) {
        result(null, { status: false, message: err });
        return;
      }
      result(null, {
        status: true,
        message: "Lead source updated successfully.",
      });
    }
  );
};

module.exports = LeadSource;

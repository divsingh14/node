const dbConnection = require("../utils/database");

let Lead = function (lead) {
  this.name = lead.name;
  this.parent_name = lead.parent_name;
  this.email = lead.email;
  this.contact_no = lead.contact_no;
  this.grade = lead.grade;
  this.country_code = lead.country_code;
  this.country = lead.country;
  this.location = lead.location;
  this.skills_to_improve = lead.skills_to_improve;
  this.lead_source = lead.lead_source ?? 1;
  this.demo_schedule = lead.demo_schedule;
  this.teacher_assigned = lead.teacher_assigned;
  this.lead_assigned = lead.lead_assigned;
  this.status = lead.status;
  this.notes = lead.notes;
  this.updated_on = new Date();
  this.updated_by = lead.updated_by;
  this.created_on = new Date();
  this.created_by = lead.created_by;
};

Lead.getAllLeads = (result) => {
  dbConnection.query("SELECT * FROM leads", (err, res) => {
    if (err) {
      console.log("Error while fetching leads", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

Lead.getLeadById = (id, result) => {
  dbConnection.query("SELECT * FROM leads WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching lead", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

Lead.addLead = (req, result) => {
  dbConnection.query("INSERT INTO leads SET ?", req, (err, res) => {
    if (err) {
      result(null, { status: false, message: err });
      return;
    }
    result(null, { status: true, message: "Lead saved successfully!!!" });
  });
};

Lead.updateLead = (req, id, result) => {
  const {
    name,
    parent_name,
    email,
    contact_no,
    grade,
    country_code,
    country,
    location,
    skills_to_improve,
    lead_source,
    status,
    notes,
  } = req;

  dbConnection.query(
    "UPDATE leads SET name=?,parent_name=?,email=?,contact_no=?,grade=?,country_code=?,country=?,location=?,skills_to_improve=?,lead_source=?,status=?,notes=?  WHERE id=?",
    [
      name,
      parent_name,
      email,
      contact_no,
      grade,
      country_code,
      country,
      location,
      skills_to_improve,
      lead_source,
      status,
      notes,
      id,
    ],
    (err, res) => {
      if (err) {
        result(null, { status: false, message: err });
        return;
      }
      result(null, { status: true, message: "Lead updated successfully." });
    }
  );
};

module.exports = Lead;

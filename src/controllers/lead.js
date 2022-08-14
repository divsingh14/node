const LeadModel = require("../models/lead");

exports.getLeads = (req, res) => {
  LeadModel.getAllLeads((err, leads) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(leads);
  });
};

exports.getLeadById = (req, res) => {
  const { id } = req.params;
  LeadModel.getLeadById(id, (err, lead) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(lead);
  });
};

exports.addLead = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const leadRequest = new LeadModel(req.body);
    LeadModel.addLead(leadRequest, (err, lead) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(lead);
    });
  }
};

exports.updateLead = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const leadRequest = new LeadModel(req.body);
    const { id } = req.params;
    LeadModel.updateLead(leadRequest, id, (err, lead) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(lead);
    });
  }
};

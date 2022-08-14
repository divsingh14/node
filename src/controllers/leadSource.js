const LeadSourseModel = require("../models/leadSource");

exports.getLeadSources = (req, res) => {
  LeadSourseModel.getLeadSources((err, leadSources) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(leadSources);
  });
};

exports.getLeadSourceById = (req, res) => {
  const { id } = req.params;
  LeadSourseModel.getLeadSourceById(id, (err, leadSource) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(leadSource);
  });
};

exports.addLeadSource = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const leadSourceReq = new LeadSourseModel(req.body);
    LeadSourseModel.addLeadSource(leadSourceReq, (err, leadSource) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(leadSource);
    });
  }
};

exports.updateLeadSource = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const leadSourceReq = new LeadSourseModel(req.body);
    const { id } = req.params;
    LeadSourseModel.updateLeadSource(leadSourceReq, id, (err, leadSource) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(leadSource);
    });
  }
};

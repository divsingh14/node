const EventModel = require("../models/event");

exports.getEvents = (req, res) => {
  EventModel.getAllEvents((err, events) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(events);
  });
};

exports.getEventById = (req, res) => {
  const { id } = req.params;
  EventModel.getEventById(id, (err, event) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(event);
  });
};

exports.addEvent = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const eventRequest = new EventModel(req.body);
    EventModel.addEvent(eventRequest, (err, event) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(event);
    });
  }
};

exports.updateEvent = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "Please fill all the fields." });
  } else {
    const eventRequest = new EventModel(req.body);
    const { id } = req.params;
    EventModel.updateEvent(eventRequest, id, (err, event) => {
      if (err) {
        res.send(err);
        res.json({ success: false, message: "Something went wrong." });
        return;
      }
      res.send(event);
    });
  }
};

const dbConnection = require("../utils/database");

let Event = function (event) {
  this.title = event.title;
  this.description = event.description;
  this.image_path = event.image_path;
  this.event_datetime = event.event_datetime;
  this.created_on = new Date();
};

Event.getAllEvents = (result) => {
  dbConnection.query("SELECT * FROM events", (err, res) => {
    if (err) {
      console.log("Error while fetching events", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

Event.getEventById = (id, result) => {
  dbConnection.query("SELECT * FROM events WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching event", err);
      result(null, res);
      return;
    }
    result(null, res);
  });
};

Event.addEvent = (req, result) => {
  dbConnection.query("INSERT INTO events SET ?", req, (err, res) => {
    if (err) {
      result(null, { status: false, message: err });
      return;
    }
    result(null, { status: true, message: "Event saved successfully!!!" });
  });
};

Event.updateEvent = (req, id, result) => {
  const { title, description, image_path, event_datetime } = req;

  dbConnection.query(
    "UPDATE events SET title=?,description=?,image_path=?,event_datetime=? WHERE id=?",
    [title, description, image_path, event_datetime, id],
    (err, res) => {
      if (err) {
        result(null, { status: false, message: err });
        return;
      }
      result(null, { status: true, message: "Event updated successfully." });
    }
  );
};

module.exports = Event;

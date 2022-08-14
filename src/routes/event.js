const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event");

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

router.post("/", eventController.addEvent);
router.post("/:id", eventController.updateEvent);

module.exports = router;

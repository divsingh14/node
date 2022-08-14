const express = require("express");
const router = express.Router();

const leadController = require("../controllers/lead");

router.get("/", leadController.getLeads);
router.get("/:id", leadController.getLeadById);

router.post("/", leadController.addLead);
router.post("/:id", leadController.updateLead);

module.exports = router;

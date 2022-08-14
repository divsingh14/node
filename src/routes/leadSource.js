const express = require("express");
const router = express.Router();

const leadSourceController = require("../controllers/leadSource");

router.get("/", leadSourceController.getLeadSources);
router.get("/:id", leadSourceController.getLeadSourceById);

router.post("/", leadSourceController.addLeadSource);
router.post("/:id", leadSourceController.updateLeadSource);

module.exports = router;

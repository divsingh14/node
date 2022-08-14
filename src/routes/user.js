const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

router.post("/", userController.addUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.getTasks);
router.post("/", tasksController.createTask);
router.patch("/:id", tasksController.toggleTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;

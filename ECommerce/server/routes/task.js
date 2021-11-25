const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, read, getByTitle } = require("../controllers/task");

router.post("/task", authCheck, adminCheck, create);
router.get("/tasks", read);
router.get("/tasks/:title", getByTitle);

module.exports = router;

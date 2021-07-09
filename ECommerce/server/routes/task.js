const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, read } = require("../controllers/task");

router.post("/task", authCheck, adminCheck, create);
router.get("/tasks", read);

module.exports = router;

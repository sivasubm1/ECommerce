const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "Hey you hit user",
  });
});

module.exports = router;

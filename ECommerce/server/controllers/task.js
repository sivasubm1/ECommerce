const Task = require("../models/task");

exports.create = async (req, res) => {
  try {
    console.log("taskReq.body", req.body);
    const newTask = await new Task(req.body).save();
    res.json(newTask);
  } catch (err) {
    console.log("err");
    // res.status(400).send("Create Product failed");

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.read = async (req, res) => {
  try {
    let tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    console.log("err");
    // res.status(400).send("Create Product failed");

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.getByTitle = async (req, res) => {
  try {
    let tasks = await Task.findOne({ title: req.params.title }).exec();
    res.json(tasks);
  } catch (err) {
    console.log("err");
    // res.status(400).send("Create Product failed");

    res.status(400).json({
      err: err.message,
    });
  }
};

const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user });

  // Convert _id → id (important for frontend)
  const formatted = tasks.map(t => ({
    id: t._id,
    title: t.title,
    description: t.description,
    done: t.done,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  }));

  res.json(formatted);
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    userId: req.user
  });

  res.json({
    id: task._id,
    title: task.title,
    description: task.description,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  });
};

exports.updateTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    { title, description },
    { new: true }
  );

  res.json({
    id: task._id,
    title: task.title,
    description: task.description,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  });
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
  res.json({ message: "Deleted" });
};

// NEW: toggle done
exports.toggleTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user });

  task.done = !task.done;
  await task.save();

  res.json({
    id: task._id,
    title: task.title,
    description: task.description,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  });
};

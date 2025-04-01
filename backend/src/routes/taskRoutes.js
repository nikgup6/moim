const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task in a group chat
router.post("/:chatId", protect, async (req, res) => {
  try {
    const task = new Task({
      chatId: req.params.chatId,
      createdBy: req.user._id,
      task: req.body.task,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

// Get tasks for a specific chat room
router.get("/:chatId", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ chatId: req.params.chatId }).populate("createdBy", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Mark a task as completed
router.put("/:taskId", protect, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// Delete a task
router.delete("/:taskId", protect, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;

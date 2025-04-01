const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Links to the chat room
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who created the task
  task: { type: String, required: true }, // Task description
  completed: { type: Boolean, default: false }, // Task status
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

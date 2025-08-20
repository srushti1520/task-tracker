const { getDB } = require("../db");

// GET all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const db = getDB();

    let query = "SELECT * FROM tasks";
    let params = [];

    if (q) {
      query += " WHERE title LIKE ?";
      params.push(`%${q}%`);
    }

    const tasks = await db.all(query, params);
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

// CREATE task
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    const db = getDB();
    const result = await db.run("INSERT INTO tasks (title) VALUES (?)", [title.trim()]);
    const newTask = await db.get("SELECT * FROM tasks WHERE id = ?", [result.lastID]);

    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
};

// TOGGLE task status
exports.toggleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const task = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!task) return res.status(404).json({ success: false, error: "Task not found" });

    const newStatus = task.done ? 0 : 1;
    await db.run("UPDATE tasks SET done = ? WHERE id = ?", [newStatus, id]);
    const updatedTask = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);

    res.json({ success: true, data: updatedTask });
  } catch (err) {
    next(err);
  }
};

// DELETE task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const result = await db.run("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

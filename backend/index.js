// backend/index.js
const express = require("express");
const cors = require("cors");
const { initDB } = require("./db");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Start server after DB init
initDB()
  .then(() => {
    // Mount routes only after DB is ready
    app.use("/api/tasks", tasksRoutes);

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to init DB:", err);
    process.exit(1);
  });

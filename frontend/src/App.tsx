import { useEffect, useState } from "react";
import { getTasks, createTask, toggleTask, deleteTask } from "./services/api";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import SearchBox from "./components/SearchBox";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks(query);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [query]);

  const handleAddTask = async (title: string) => {
    try {
      await createTask(title);
      loadTasks();
    } catch  {
      alert("Error adding task");
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await toggleTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
      <TaskInput onAdd={handleAddTask} />
      <SearchBox value={query} onChange={setQuery} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;

import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  loading,
  error,
}: TaskListProps) {
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

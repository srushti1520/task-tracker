import type { Task } from "../types/task";
import { Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow mb-2 hover:shadow-md transition">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done} // ✅ already boolean now
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 cursor-pointer accent-blue-600"
        />
        <span
          className={`${
            task.done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}

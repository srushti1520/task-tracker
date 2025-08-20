import { useState } from "react";

interface TaskInputProps {
  onAdd: (title: string) => Promise<void>; // now async
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await onAdd(title.trim());
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-2"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl
                   focus:outline-none focus:border-blue-500 transition-all duration-200
                   shadow-sm"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-3 text-white text-lg font-medium rounded-xl
                   ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                   active:scale-95 shadow-md transition-all duration-200`}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { Task } from "../types/task";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getTasks = async (query?: string): Promise<Task[]> => {
  const res = await api.get("/tasks", { params: query ? { q: query } : {} });
  // backend sends { success, data: Task[] }
  return res.data.data.map((task: any) => ({
    ...task,
    done: task.done === 1, // normalize number -> boolean
  }));
};

export const createTask = async (title: string): Promise<Task> => {
  if (!title.trim()) throw new Error("Title cannot be empty");
  const res = await api.post("/tasks", { title });
  return {
    ...res.data.data,
    done: res.data.data.done === 1,
  };
};

export const toggleTask = async (id: number): Promise<Task> => {
  const res = await api.patch(`/tasks/${id}`);
  return {
    ...res.data.data,
    done: res.data.data.done === 1,
  };
};

export const deleteTask = async (id: number): Promise<{ id: number }> => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data.data;
};

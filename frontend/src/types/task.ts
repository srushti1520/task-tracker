// src/types/task.ts
export interface Task {
  id: number;
  title: string;
  done: boolean; // frontend always uses boolean
  createdAt: string;
}

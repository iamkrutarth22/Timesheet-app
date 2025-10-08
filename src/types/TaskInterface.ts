export interface Task {
  id: string;
  userid: string;
  date: string; // ISO format, e.g., "2024-01-21"
  taskType: string;
  projectName: string;
  totalHours: number;
  completedHours: number;
  description: string;
}
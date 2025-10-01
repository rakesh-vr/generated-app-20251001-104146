export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// IronPath Application Types
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface WorkoutLog {
  day: number;
  date: string; // ISO 8601 format
  calories: number;
}
export interface UserProgress {
  completedWorkouts: number[]; // Array of completed day numbers
  totalCalories: number;
}
export interface UserData extends User, UserProgress {}
import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type { UserProgress, WorkoutLog } from '@shared/types';
import { useAuthStore } from './auth';
interface WorkoutState extends UserProgress {
  logs: WorkoutLog[];
  isLoading: boolean;
  error: string | null;
  fetchProgress: () => Promise<void>;
  fetchLogs: () => Promise<void>;
  logWorkout: (workout: Omit<WorkoutLog, 'date'>) => Promise<void>;
  setProgress: (progress: UserProgress) => void;
}
export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  completedWorkouts: [],
  totalCalories: 0,
  logs: [],
  isLoading: true,
  error: null,
  setProgress: (progress) => {
    set({
      completedWorkouts: progress.completedWorkouts,
      totalCalories: progress.totalCalories,
      isLoading: false,
      error: null,
    });
  },
  fetchProgress: async () => {
    const userEmail = useAuthStore.getState().user?.email;
    if (!userEmail) {
      set({ error: 'User not authenticated', isLoading: false });
      return;
    }
    set({ isLoading: true });
    try {
      const progress = await api<UserProgress>(`/api/users/${userEmail}/progress`);
      set({
        completedWorkouts: progress.completedWorkouts,
        totalCalories: progress.totalCalories,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      set({ error: 'Failed to fetch workout progress.', isLoading: false });
    }
  },
  fetchLogs: async () => {
    const userEmail = useAuthStore.getState().user?.email;
    if (!userEmail) return;
    try {
      const logs = await api<WorkoutLog[]>(`/api/users/${userEmail}/logs`);
      set({ logs });
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // Non-critical, so don't set a global error state
    }
  },
  logWorkout: async (workout) => {
    const userEmail = useAuthStore.getState().user?.email;
    if (!userEmail) {
      set({ error: 'User not authenticated' });
      return;
    }
    try {
      const newProgress = await api<UserProgress>(`/api/users/${userEmail}/log-workout`, {
        method: 'POST',
        body: JSON.stringify(workout),
      });
      set({
        completedWorkouts: newProgress.completedWorkouts,
        totalCalories: newProgress.totalCalories,
        error: null,
      });
      // After logging, refresh logs for the chart
      get().fetchLogs();
    } catch (error) {
      console.error('Failed to log workout:', error);
      set({ error: 'Failed to log workout.' });
    }
  },
}));
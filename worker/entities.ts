import { IndexedEntity } from "./core-utils";
import type { User, WorkoutLog } from "@shared/types";
export interface IronPathUserState extends User {
  logs: WorkoutLog[];
}
export class IronPathUserEntity extends IndexedEntity<IronPathUserState> {
  static readonly entityName = "ironpath_user";
  static readonly indexName = "ironpath_users";
  static readonly initialState: IronPathUserState = { id: "", name: "", email: "", logs: [] };
  // Use email as the key for our user entity
  // The generic signature must match the base class. We use a type assertion
  // to safely access the 'email' property specific to our state.
  static override keyOf<U extends { id: string }>(state: U): string {
    return (state as IronPathUserState).email;
  }
  async getLogs(): Promise<WorkoutLog[]> {
    const { logs } = await this.getState();
    return logs ?? [];
  }
  async addLog(log: Omit<WorkoutLog, 'date'>): Promise<void> {
    const newLog: WorkoutLog = { ...log, date: new Date().toISOString() };
    // Prevent adding duplicate logs for the same day
    await this.mutate(s => {
        const hasLoggedThisDay = s.logs?.some(l => l.day === newLog.day);
        if (hasLoggedThisDay) {
            return s;
        }
        return { ...s, logs: [...(s.logs ?? []), newLog] };
    });
  }
  async getProgress() {
    const logs = await this.getLogs();
    const completedWorkouts = [...new Set(logs.map(log => log.day))];
    const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);
    return { completedWorkouts, totalCalories };
  }
}
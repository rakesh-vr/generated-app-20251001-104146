import { Hono } from "hono";
import type { Env } from './core-utils';
import { IronPathUserEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { WorkoutLog } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // User login/creation
  app.post('/api/users/login', async (c) => {
    const { email, name } = (await c.req.json()) as { email?: string; name?: string };
    if (!isStr(email) || !isStr(name)) return bad(c, 'email and name are required');
    const userEntity = new IronPathUserEntity(c.env, email);
    let userState = await userEntity.getState();
    if (!userState.id) { // User doesn't exist, create them
      userState = await IronPathUserEntity.create(c.env, {
        id: crypto.randomUUID(),
        email,
        name,
        logs: [],
      });
    }
    const progress = await userEntity.getProgress();
    return ok(c, {
      id: userState.id,
      email: userState.email,
      name: userState.name,
      ...progress,
    });
  });
  // Get user progress summary
  app.get('/api/users/:userId/progress', async (c) => {
    const { userId } = c.req.param();
    const userEntity = new IronPathUserEntity(c.env, userId);
    if (!(await userEntity.exists())) return notFound(c, 'User not found');
    const progress = await userEntity.getProgress();
    return ok(c, progress);
  });
  // Get all user workout logs
  app.get('/api/users/:userId/logs', async (c) => {
    const { userId } = c.req.param();
    const userEntity = new IronPathUserEntity(c.env, userId);
    if (!(await userEntity.exists())) return notFound(c, 'User not found');
    const logs = await userEntity.getLogs();
    return ok(c, logs);
  });
  // Log a workout
  app.post('/api/users/:userId/log-workout', async (c) => {
    const { userId } = c.req.param();
    const workout = (await c.req.json()) as Omit<WorkoutLog, 'date'>;
    if (typeof workout.day !== 'number' || typeof workout.calories !== 'number') {
      return bad(c, 'Invalid workout data');
    }
    const userEntity = new IronPathUserEntity(c.env, userId);
    if (!(await userEntity.exists())) return notFound(c, 'User not found');
    await userEntity.addLog(workout);
    const progress = await userEntity.getProgress();
    return ok(c, progress);
  });
}
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WORKOUT_PLAN } from '@/lib/data';
import { ArrowRight, CheckCircle, Flame, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useWorkoutStore } from '@/store/workout';
import { useEffect, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const StatCard = ({ icon, label, value, unit, isLoading }: { icon: React.ReactNode; label: string; value: string | number; unit: string; isLoading?: boolean }) => (
  <Card className="bg-card/50 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-4 w-20" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{unit}</p>
        </>
      )}
    </CardContent>
  </Card>
);
export function HomePage() {
  const { completedWorkouts, totalCalories, isLoading, fetchProgress, logs, fetchLogs } = useWorkoutStore();
  useEffect(() => {
    fetchProgress();
    fetchLogs();
  }, [fetchProgress, fetchLogs]);
  const today = new Date().getDay(); // Sunday = 0, Monday = 1, etc.
  const currentDay = today === 0 ? 7 : today;
  const todaysWorkout = WORKOUT_PLAN.find(w => w.day === currentDay);
  const chartData = useMemo(() => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek.map((name, index) => {
      const dayNum = index + 1;
      const log = logs.find(l => l.day === dayNum);
      return {
        name,
        day: dayNum,
        calories: log ? log.calories : 0,
      };
    });
  }, [logs]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
  };
  const completedCount = completedWorkouts.length;
  const progressPercentage = (completedCount / 6) * 100;
  return (
    <motion.div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-display text-foreground">Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">Your weekly fitness journey at a glance.</p>
      </motion.div>
      <div className="grid gap-8 mt-8 grid-cols-1 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          {todaysWorkout && (
            <Card className="overflow-hidden shadow-lg shadow-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Today's Workout: {todaysWorkout.title}</CardTitle>
                <CardDescription>{todaysWorkout.focus}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {todaysWorkout.isRestDay ? "Today is your rest day. Focus on recovery and nutrition." : `Get ready for a challenging session focusing on ${todaysWorkout.focus.toLowerCase()}.`}
                </p>
                <Button asChild size="lg" className="group">
                  <Link to={`/workout/${todaysWorkout.day}`}>
                    {todaysWorkout.isRestDay ? 'View Recovery Tips' : 'Start Workout'}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your workout plan for this week.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {WORKOUT_PLAN.map((day) => (
                <Link to={`/workout/${day.day}`} key={day.day} className="block">
                  <motion.div className={cn("flex items-center p-4 rounded-lg border transition-all duration-200", day.day === currentDay ? 'bg-primary/10 border-primary/50' : 'bg-card hover:bg-accent')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full mr-4", completedWorkouts.includes(day.day) ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                      {completedWorkouts.includes(day.day) ? <CheckCircle className="h-5 w-5" /> : <span className="font-bold">{day.day}</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{day.title}</p>
                      <p className="text-sm text-muted-foreground">{day.focus}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatCard icon={<Target className="h-4 w-4 text-muted-foreground" />} label="Workouts Completed" value={`${completedCount} / 6`} unit="sessions" isLoading={isLoading} />
              <StatCard icon={<Flame className="h-4 w-4 text-muted-foreground" />} label="Calories Burned" value={totalCalories.toLocaleString()} unit="kcal estimate" isLoading={isLoading} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Calories burned per workout this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
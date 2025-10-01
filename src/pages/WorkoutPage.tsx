import { useParams, Link, useNavigate } from 'react-router-dom';
import { WORKOUT_PLAN, Exercise } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flame, Target, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useWorkoutStore } from '@/store/workout';
export function WorkoutPage() {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const workoutDay = WORKOUT_PLAN.find((w) => w.day.toString() === day);
  const { completedWorkouts } = useWorkoutStore();
  const isCompleted = completedWorkouts.includes(Number(day));
  const handleStartWorkout = () => {
    if (!workoutDay || isCompleted) return;
    navigate(`/workout/${day}/active`, { state: { workoutDay } });
  };
  if (!workoutDay) {
    return (
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-display text-foreground mb-4">Workout not found</h1>
        <p className="text-lg text-muted-foreground mb-8">The workout for this day could not be located.</p>
        <Button asChild>
          <Link to="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      </div>
    );
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
  };
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="mb-8">
          <Button asChild variant="outline" className="mb-8"><Link to="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link></Button>
          <h1 className="text-4xl md:text-5xl font-display text-foreground">{workoutDay.title}</h1>
          <p className="text-xl text-muted-foreground mt-2">{workoutDay.focus}</p>
          <div className="flex items-center gap-4 mt-4 text-muted-foreground">
            <div className="flex items-center gap-2"><Flame className="w-5 h-5 text-primary" /><span>{workoutDay.calories} kcal</span></div>
            <div className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" /><span>{workoutDay.exercises.length} exercises</span></div>
          </div>
        </motion.div>
        {workoutDay.isRestDay ? (
          <motion.div variants={itemVariants}>
            <Card className="text-center py-16 bg-card/50"><CardHeader><CardTitle className="text-3xl font-display">Time for Recovery</CardTitle><CardDescription className="text-lg">Rest is crucial for muscle growth and performance.</CardDescription></CardHeader><CardContent><p className="text-muted-foreground max-w-md mx-auto">Use today to stretch, hydrate, and eat well. Your body is repairing and getting stronger for the next session.</p></CardContent></Card>
          </motion.div>
        ) : (
          <>
            <motion.div variants={itemVariants} className="mb-8">
              <Button size="lg" className="w-full md:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" onClick={handleStartWorkout} disabled={isCompleted}>
                <PlayCircle className="mr-2 h-5 w-5" />
                {isCompleted ? 'Workout Completed' : 'Start Workout Session'}
              </Button>
            </motion.div>
            <motion.div variants={containerVariants} className="space-y-6">
              {workoutDay.exercises.map((exercise: Exercise, index: number) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1"><img src={exercise.media} alt={exercise.name} className="w-full h-48 md:h-full object-cover" /></div>
                      <div className="md:col-span-2 p-6">
                        <CardTitle className="text-2xl font-semibold">{exercise.name}</CardTitle>
                        <div className="flex items-center gap-4 my-3">
                          <Badge variant="secondary">Sets: {exercise.sets}</Badge>
                          <Badge variant="secondary">Reps: {exercise.reps}</Badge>
                        </div>
                        <p className="text-muted-foreground text-base">{exercise.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
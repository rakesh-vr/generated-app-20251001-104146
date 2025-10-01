import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { WORKOUT_PLAN, WorkoutDay } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Play, Pause, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { useWorkoutStore } from '@/store/workout';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const REST_DURATION = 60; // 60 seconds rest
export function ActiveWorkoutPage() {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const workoutDay: WorkoutDay | undefined = location.state?.workoutDay || WORKOUT_PLAN.find((w) => w.day.toString() === day);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(REST_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { logWorkout } = useWorkoutStore();
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && isTimerRunning && restTime > 0) {
      timer = setInterval(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
    } else if (restTime === 0) {
      setIsResting(false);
      setIsTimerRunning(false);
      if (currentExerciseIndex < (workoutDay?.exercises.length ?? 0) - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isResting, isTimerRunning, restTime, currentExerciseIndex, workoutDay, navigate]);
  if (!workoutDay || workoutDay.isRestDay) {
    return (
      <div className="text-center p-8">
        <p>Invalid workout session.</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Back to Dashboard</Button>
      </div>
    );
  }
  const currentExercise = workoutDay.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + (isResting ? 1 : 0)) / workoutDay.exercises.length) * 100;
  const handleNext = () => {
    if (currentExerciseIndex < workoutDay.exercises.length - 1) {
      setIsResting(true);
      setRestTime(REST_DURATION);
      setIsTimerRunning(true);
    } else {
      handleFinishWorkout();
    }
  };
  const handleFinishWorkout = async () => {
    await logWorkout({ day: workoutDay.day, calories: workoutDay.calories });
    toast.success('Workout Complete!', {
      description: 'Awesome work! Your progress has been saved.',
    });
    setTimeout(() => navigate('/dashboard'), 2000);
  };
  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => setRestTime(REST_DURATION);
  const skipRest = () => {
    setIsResting(false);
    setIsTimerRunning(false);
    if (currentExerciseIndex < workoutDay.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      handleFinishWorkout();
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Toaster richColors theme="dark" />
      <Card className="w-full max-w-2xl mx-auto shadow-2xl shadow-primary/10">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-display">{workoutDay.title}</CardTitle>
              <p className="text-muted-foreground">Exercise {currentExerciseIndex + 1} of {workoutDay.exercises.length}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>End Workout</Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="text-center">
          <AnimatePresence mode="wait">
            {isResting ? (
              <motion.div key="rest" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center h-96">
                <h2 className="text-3xl font-bold text-primary">REST</h2>
                <div className="text-7xl font-mono font-bold my-8">{String(Math.floor(restTime / 60)).padStart(2, '0')}:{String(restTime % 60).padStart(2, '0')}</div>
                <div className="flex gap-4">
                  <Button onClick={toggleTimer} size="icon" variant="outline">{isTimerRunning ? <Pause /> : <Play />}</Button>
                  <Button onClick={resetTimer} size="icon" variant="outline"><RotateCcw /></Button>
                </div>
                <Button onClick={skipRest} variant="link" className="mt-4">Skip Rest</Button>
              </motion.div>
            ) : (
              <motion.div key={currentExercise.name} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
                <img src={currentExercise.media} alt={currentExercise.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h2 className="text-3xl font-bold">{currentExercise.name}</h2>
                <div className="flex justify-center gap-6 my-4 text-lg">
                  <span>Sets: <span className="font-bold text-primary">{currentExercise.sets}</span></span>
                  <span>Reps: <span className="font-bold text-primary">{currentExercise.reps}</span></span>
                </div>
                <p className="text-muted-foreground mb-8">{currentExercise.description}</p>
                <Button onClick={handleNext} size="lg" className="w-full md:w-auto group">
                  {currentExerciseIndex === workoutDay.exercises.length - 1 ? (
                    <>Finish Workout <Trophy className="ml-2 h-5 w-5" /></>
                  ) : (
                    <>Complete Set <Check className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
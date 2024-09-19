"use client"
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Video,
  Volume2,
  Plus,
  Minus,
  SkipForward,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";

type Exercise = {
  name: string;
  sets?: number;      // Fixed number of sets
  reps?: string;      // Range for reps
  completedSets?: number;
};

const upperBodyWorkout: Exercise[] = [
  { name: "Bent Over Dumbbell Row", sets: 4, reps: "8", completedSets: 0 },
  { name: "Dumbbell Bench Press", sets: 4, reps: "8", completedSets: 0 },
  { name: "Dumbbell Lateral Raise", sets: 3, reps: "8", completedSets: 0 },
  { name: "Dumbbell Pullover", sets: 3, reps: "8", completedSets: 0 },
  { name: "Dumbbell Bicep Curl", sets: 2, reps: "8", completedSets: 0 },
  { name: "Dumbbell Tricep Extension", sets: 2, reps: "8", completedSets: 0 },
  { name: "Dumbbell Shrug", sets: 2, reps: "12", completedSets: 0 },
];

export default function MainWorkout() {
  const [currentExercise, setCurrentExercise] = useState<number>(1);
  const [workout, setWorkout] = useState<Exercise[]>(upperBodyWorkout);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(30);
  const [initialRestTime, setInitialRestTime] = useState<number>(30);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (restTime === 0) {
      setIsResting(false);
      setRestTime(initialRestTime);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResting, restTime, initialRestTime]);

  const handleComplete = () => {
    setWorkout((prev) => {
      // Ensure currentExercise is within bounds
      if (currentExercise < 0 || currentExercise >= prev.length) {
        return prev; // Return the original array if the index is invalid
      }

      const updated = [...prev];
      const currentExerciseData = { ...updated[currentExercise] }; // Shallow copy of the current exercise

      // Ensure currentExerciseData exists and has the required properties
      if (
        typeof currentExerciseData.completedSets === 'number' &&
        typeof currentExerciseData.sets === 'number' &&
        currentExerciseData.completedSets < currentExerciseData.sets
      ) {
        currentExerciseData.completedSets++;
        updated[currentExercise] = currentExerciseData; // Update the exercise in the array
        setIsResting(true);
        setRestTime(initialRestTime);
      }

      return updated;
    });
  };




  const nextExercise = () => {
    if (currentExercise < workout.length - 1) {
      setCurrentExercise((prev) => prev + 1);
      setIsResting(false);
      setRestTime(initialRestTime);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise((prev) => prev - 1);
      setIsResting(false);
      setRestTime(initialRestTime);
    }
  };

  const adjustRestTime = (amount: number) => {
    setInitialRestTime((prev) => Math.max(0, prev + amount));
    if (isResting) {
      setRestTime((prev) => Math.max(0, prev + amount));
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTime(initialRestTime);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Upper Body Workout</CardTitle>
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={prevExercise}
              disabled={currentExercise === 0}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold flex items-center">
              {workout[currentExercise]?.name}
              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
            </h2>
            <Button
              onClick={nextExercise}
              disabled={currentExercise === workout.length - 1}
              size="icon"
              variant="ghost"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-400">Exercise illustration</span>
          </div>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold">x{workout[currentExercise]?.reps}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            {/* Corrected display of sets */}
            <span>
              Sets: {workout[currentExercise]?.completedSets}/{workout[currentExercise]?.sets}
            </span>
            <span>Reps: {workout[currentExercise]?.reps}</span>
          </div>
          {isResting ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Rest Time:</span>
                <span>{restTime}s</span>
              </div>
              <Progress
                value={((initialRestTime - restTime) / initialRestTime) * 100}
              />
              <div className="flex justify-between items-center mt-2">
                <Button onClick={() => adjustRestTime(-30)} size="sm" variant="outline">
                  <Minus className="h-4 w-4 mr-1" /> 30s
                </Button>
                <Button onClick={skipRest} size="sm" variant="outline">
                  <SkipForward className="h-4 w-4 mr-1" /> Skip
                </Button>
                <Button onClick={() => adjustRestTime(30)} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> 30s
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={handleComplete}
              disabled={
                workout[currentExercise]?.completedSets === workout[currentExercise]?.sets
              }
            >
              {workout[currentExercise]?.completedSets === workout[currentExercise]?.sets
                ? "Completed"
                : "Complete Set"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


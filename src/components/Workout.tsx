"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, HelpCircle, Plus, Minus, SkipForward } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Button } from "~/components/ui/button"

type Exercise = {
  name: string
  sets: number
  reps: string
}

const upperBodyWorkout: Exercise[] = [
  { name: "Bent Over Dumbbell Row", sets: 4, reps: "8", },
  { name: "Dumbbell Bench Press", sets: 4, reps: "8" },
  { name: "Dumbbell Lateral Raise", sets: 3, reps: "8" },
  { name: "Dumbbell Pullover", sets: 3, reps: "8" },
  { name: "Dumbbell Bicep Curl", sets: 2, reps: "8" },
  { name: "Dumbbell Tricep Extension", sets: 2, reps: "8" },
  { name: "Dumbbell Shrug", sets: 2, reps: "12" },
]

export default function Component() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0)
  const [currentSets, setCurrentSets] = useState<number>(1);
  const [isResting, setIsResting] = useState<boolean>(false)
  const [restTime, setRestTime] = useState<number>(30)
  const [initialRestTime, setInitialRestTime] = useState<number>(30)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (restTime === 0) {
      setIsResting(false)
      setRestTime(initialRestTime)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isResting, restTime, initialRestTime])

  const currentExercise = upperBodyWorkout[currentExerciseIndex]

  const handleComplete = () => {
    if (currentExercise && currentSets < currentExercise.sets) {
      setCurrentSets((prev) => prev + 1)
      setIsResting(true)
      setRestTime(initialRestTime)
    } else {
      nextExercise()
      setCurrentSets(0)
    }
  }

  const nextExercise = () => {
    if (currentExerciseIndex < upperBodyWorkout.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
      setIsResting(false)
      setRestTime(initialRestTime)
    }
  }

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1)
      setIsResting(false)
      setRestTime(initialRestTime)
    }
  }

  const adjustRestTime = (amount: number) => {
    setInitialRestTime((prev) => Math.max(0, prev + amount))
    if (isResting) {
      setRestTime((prev) => Math.max(0, prev + amount))
    }
  }

  const skipRest = () => {
    setIsResting(false)
    setRestTime(initialRestTime)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Upper Body Workout</CardTitle>
          <div className="text-lg font-semibold">
            {currentExerciseIndex + 1}/{upperBodyWorkout.length}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">

            {/*<Button
              onClick={prevExercise}
              disabled={currentExerciseIndex === 0}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>*/}
            <h2 className="text-xl font-semibold flex items-center">
              {currentExercise?.name}
              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
            </h2>
            {/*<Button
              onClick={nextExercise}
              disabled={currentExerciseIndex === upperBodyWorkout.length - 1}
              size="icon"
              variant="ghost"
            >
              <ChevronRight className="h-4 w-4" />
            </Button> */}
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-400">Exercise illustration</span>
          </div>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold">x{currentExercise?.reps}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span>
              Sets: {currentSets}/{currentExercise?.sets}
            </span>
            <span>Reps: {currentExercise?.reps}</span>
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
            >
              {currentSets === currentExercise?.sets
                ? "Next Exercise"
                : "Next Sets"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


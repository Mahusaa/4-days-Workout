"use client"
import React, { useState } from 'react';

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  completedSets: number;
};

type WorkoutProps = {
  exercises: Exercise[];
};

const ExerciseCard: React.FC<{ exercise: Exercise; onCompleteSet: () => void }> = ({
  exercise,
  onCompleteSet,
}) => {
  return (
    <div className="exercise-card bg-white shadow-md rounded-lg p-6 mb-4 text-center">
      <h3 className="text-lg font-semibold">{exercise.name}</h3>
      <p className="text-gray-600">Sets: {exercise.sets}</p>
      <p className="text-gray-600">Reps: {exercise.reps}</p>
      <p className="text-blue-600 font-bold">
        Completed Sets: {exercise.completedSets}/{exercise.sets}
      </p>
      <button
        onClick={onCompleteSet}
        disabled={exercise.completedSets >= exercise.sets}
        className={`mt-4 px-6 py-2 text-white rounded-lg ${exercise.completedSets >= exercise.sets ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'
          }`}
      >
        {exercise.completedSets >= exercise.sets ? 'All Sets Completed' : 'Complete Set'}
      </button>
    </div>
  );
};

const Workout: React.FC<WorkoutProps> = ({ exercises }) => {
  const [workoutData, setWorkoutData] = useState(exercises);

  const handleCompleteSet = (index: number) => {
    const updatedWorkout = workoutData.map((exercise, i) => {
      if (i === index && exercise.completedSets < exercise.sets) {
        return { ...exercise, completedSets: exercise.completedSets + 1 };
      }
      return exercise;
    });
    setWorkoutData(updatedWorkout);
  };

  return (
    <div className="workout-container flex flex-col items-center justify-center mt-8">
      {workoutData.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          onCompleteSet={() => handleCompleteSet(index)}
        />
      ))}
    </div>
  );
};

// Example workout data
const upperBodyWorkout = [
  { name: "Bent Over Dumbbell Row", sets: 4, reps: "8-10", completedSets: 0 },
  { name: "Dumbbell Bench Press", sets: 4, reps: "8-10", completedSets: 0 },
  { name: "Dumbbell Lateral Raise", sets: 3, reps: "8-12", completedSets: 0 },
  { name: "Dumbbell Pullover", sets: 3, reps: "8-12", completedSets: 0 },
  { name: "Dumbbell Bicep Curl", sets: 2, reps: "8-12", completedSets: 0 },
  { name: "Dumbbell Tricep Extension", sets: 2, reps: "8-12", completedSets: 0 },
  { name: "Dumbbell Shrug", sets: 2, reps: "12-15", completedSets: 0 },
];

const Exercise: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Upper Body Workout</h1>
      <Workout exercises={upperBodyWorkout} />
    </div>
  );
};

export default Exercise;


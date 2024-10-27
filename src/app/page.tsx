import WeekCalendar from "~/components/WeekCalendar";
import MainWorkout from "~/components/Workout";

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 justify-center">Dumbbelly - 4 Days workout plan</h1>
      <WeekCalendar />
      <MainWorkout />
    </>
  );
}

import WeekCalendar from "~/components/WeekCalendar";
import MainWorkout from "~/components/Workout";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const workoutDate = ["Mon Oct 28 2024",
    "Sun Oct 27 2024"]


  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center justify-center">Dumbbelly </h1>
      <WeekCalendar workedOutDays={workoutDate} />
      <MainWorkout />
    </>
  );
}

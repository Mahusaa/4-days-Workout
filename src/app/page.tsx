import WeekCalendar from "~/components/WeekCalendar";
import MainWorkout from "~/components/Workout";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();


  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1 className="text-2xl font-bold mb-4 justify-center">Dumbbelly - 4 Days workout plan</h1>
      <WeekCalendar />
      <MainWorkout />
    </>
  );
}

import WeekCalendar from "~/components/WeekCalendar";
import MainWorkout from "~/components/Workout";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { getWeekCalendar } from "~/server/queries";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  }
  const userId = session.user.id;
  const workoutDate = await getWeekCalendar(userId) as string[];

  return (
    <>
      <WeekCalendar workedOutDays={workoutDate} />
      <MainWorkout />
    </>
  );
}

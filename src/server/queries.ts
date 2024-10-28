import "server-only"
import { db } from "./db"

export async function getWeekCalendar(id: string) {
  const workoutDate = await db.query.workoutDays.findFirst({
    where: (model, { eq }) => eq(model.userId, id),
  })
  return workoutDate?.workoutDate;
}

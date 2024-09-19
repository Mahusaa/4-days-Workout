"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const WeekCalendar = () => {
  const [workedOutDays, setWorkedOutDays] = useState<string[]>([]);

  const toggleWorkout = (date: string) => {
    setWorkedOutDays((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
    console.log(workedOutDays)
  };

  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  return (
    <div className="grid grid-cols-7 gap-2 mb-4">
      {weekDays.map((day, index) => {
        const isToday = day.toDateString() === new Date().toDateString();
        const isWorkedOut = workedOutDays.includes(day.toDateString());

        return (
          <Button
            key={index}
            variant={isToday ? "default" : "outline"}
            className={`relative h-16 ${isToday ? "ring-2 ring-primary" : ""} ${isWorkedOut ? "bg-green-200 hover:bg-green-200" : ""
              } hover:ring-2 hover:ring-primary transition-all`}
            onClick={() => toggleWorkout(day.toDateString())}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-lg font-bold">{day.getDate()}</span>
              {isWorkedOut && (
                <div className="absolute top-1 right-1">
                  <CheckCircle className="w-4 h-4 text-black opacity-70" />
                </div>
              )}
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default WeekCalendar;


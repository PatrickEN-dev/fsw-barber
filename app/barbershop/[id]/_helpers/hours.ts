import { setHours, setMinutes, format, addMinutes, addHours } from "date-fns";

interface IGenerateDayTimeListProps {
  date: Date;
  openHour: number;
  closeHour: number;
  intervalTime: number;
}

// Make this function dynamic so that each barbershop can choose its own start and closing times, as well as interval duration.

export function generateDayTimeList(date: Date): string[] {
  const currentTime = new Date();
  const startTime = addHours(setMinutes(setHours(currentTime, currentTime.getHours() + 1), 0), 1); // Horário inicial uma hora depois do horário atual
  const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
  const interval = 45; // interval in minutes
  const timeList: string[] = [];

  let current = startTime;

  while (current <= endTime) {
    timeList.push(format(current, "HH:mm"));
    current = addMinutes(current, interval);
  }

  return timeList;
}

"use client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { Button } from "@/app/_components/ui/button";

const BookingMenu = () => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [hour, setHour] = useState<string | undefined>("");

  const handleHourClicck = (time: string) => setHour(time);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timeList = useMemo(() => (date ? generateDayTimeList(date) : []), [date]);

  return (
    <SheetContent className="p-0">
      <SheetHeader className="text-left px-5 py-6 border-solid border-secondary">
        <SheetTitle>Fazer reserva</SheetTitle>
      </SheetHeader>

      <CalendarComponent
        date={date}
        setDate={setDate as any}
        newDate={today}
        handleDateClick={handleDateClick}
      />

      {/* Mostrar a lista de horários apenas se alguma data estiver selecionada*/}

      {date && (
        <ul className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden py-6 px-5 border-y border-solid border-secondary mt-2">
          {timeList.map((time, index) => (
            <Button
              variant={hour === time ? "default" : "outline"}
              className="rounded-full"
              key={index}
              onClick={() => handleHourClicck(time)}
            >
              {time}
            </Button>
          ))}
        </ul>
      )}
    </SheetContent>
  );
};

export default BookingMenu;

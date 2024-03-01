"use client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import TimeListComponent from "./TimeListComponent";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { formatPrice } from "@/app/_utils/formatPrices";
import ServiceCardDetails from "./serviceCardDetails";

interface IBookingMenuProps {
  service: Service;
}

const BookingMenu = ({ service }: IBookingMenuProps) => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [hour, setHour] = useState<string | undefined>("");

  const handleHourClick = (time: string) => setHour(time);

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

      <div className="py-6">
        <CalendarComponent
          date={date}
          setDate={setDate as any}
          newDate={today}
          handleDateClick={handleDateClick}
        />
      </div>

      {date && (
        <TimeListComponent hour={hour} timeList={timeList} handleHourClick={handleHourClick} />
      )}

      <div className="py-6">
        <ServiceCardDetails service={service} date={date} hour={hour} />
      </div>
    </SheetContent>
  );
};

export default BookingMenu;

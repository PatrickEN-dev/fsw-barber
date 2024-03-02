"use client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../../_helpers/hours";
import TimeListComponent from "./TimeListComponent";
import { Barbershop, Service } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import ServiceCardDetails from "./ServiceCardDetails";

interface IBookingMenuProps {
  service: Service;
  barbershop: Barbershop;
}

const BookingMenu = ({ service, barbershop }: IBookingMenuProps) => {
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

      <div className="py-6 px-5 border-t border-solid border-secondary">
        <ServiceCardDetails service={service} date={date} hour={hour} barbershop={barbershop} />
      </div>

      <SheetFooter className="px-5">
        <Button disabled={!date || !hour} type="button">
          Confirmar reserva
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default BookingMenu;

"use client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { generateDayTimeList } from "../../_helpers/hours";
import TimeListComponent from "./TimeListComponent";
import { Barbershop, Service } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import ServiceCardDetails from "./ServiceCardDetails";
import { useSession } from "next-auth/react";
import { setHours, setMinutes } from "date-fns";
import { saveBooking } from "../../_actions/saveBooking";
import { useLoading } from "@/app/_providers/loading";
import { Loader2 } from "lucide-react";

interface IBookingMenuProps {
  service: Service;
  barbershop: Barbershop;
  hour: string | undefined;
  setHour: Dispatch<SetStateAction<string | undefined>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  newDate: Date;
}

const BookingMenu = ({
  service,
  barbershop,
  hour,
  setHour,
  date,
  setDate,
  newDate,
}: IBookingMenuProps) => {
  const { data } = useSession();
  const { isLoading, setIsLoading } = useLoading();
  const handleHourClick = (time: string) => setHour(time);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timeList = useMemo(() => (date ? generateDayTimeList(date) : []), [date]);

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    try {
      if (!hour || !date || !data?.user)
        return console.error("ERROR: handleBookingSubmit values not founded");

      const intHours = Number(hour.split(":")[0]);
      const intMinutes = Number(hour.split(":")[1]);
      const newDateFormatted = setMinutes(setHours(date, intHours), intMinutes);

      await saveBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        userId: (data.user as any).id,
        date: newDateFormatted,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetContent className="p-0">
      <SheetHeader className="text-left px-5 py-6 border-solid border-secondary">
        <SheetTitle>Fazer reserva</SheetTitle>
      </SheetHeader>

      <div className="py-6">
        <CalendarComponent {...{ date, setDate: setDate, newDate, handleDateClick }} />
      </div>

      {date && <TimeListComponent {...{ hour, timeList, handleHourClick }} />}

      <div className="py-6 px-5 border-t border-solid border-secondary">
        <ServiceCardDetails service={service} date={date} hour={hour} barbershop={barbershop} />
      </div>

      <SheetFooter className="px-5">
        <Button disabled={!date || !hour || isLoading} onClick={handleBookingSubmit}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirmar reserva
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default BookingMenu;

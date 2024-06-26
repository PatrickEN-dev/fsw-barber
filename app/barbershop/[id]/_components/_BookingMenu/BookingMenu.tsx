"use client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../../_helpers/hours";
import TimeListComponent from "./TimeListComponent";
import { Barbershop, Booking, Service } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import ServiceCardDetails from "./ServiceCardDetails";
import { useSession } from "next-auth/react";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../../_actions/saveBooking";
import { useLoading } from "@/app/_providers/loading";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../../_actions/getDayBookings";

interface IBookingMenuProps {
  service: Service;
  barbershop: Barbershop;
  hour: string | undefined;
  setHour: Dispatch<SetStateAction<string | undefined>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  newDate: Date;
  sheetIsOpen: boolean;
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BookingMenu = ({
  service,
  barbershop,
  hour,
  setHour,
  date,
  setDate,
  newDate,
  sheetIsOpen,
  setSheetIsOpen,
}: IBookingMenuProps) => {
  const { push } = useRouter();
  const { data } = useSession();
  const { isLoading, setIsLoading } = useLoading();
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const handleHourClick = (time: string) => setHour(time);

  const hourSplitted = hour ? Number(hour?.split(":")[0]) : 0;
  const minuteSplitted = hour ? Number(hour?.split(":")[1]) : 0;

  useEffect(() => {
    if (!date) return console.error("Theren't date on useEffect getDayBookings");

    const refreshAvailableHours = async () => {
      // preciso passar barberId no futuro
      const dayBookingsData = await getDayBookings(barbershop.id, date);
      setDayBookings(dayBookingsData);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timeList = useMemo(
    () =>
      date
        ? generateDayTimeList(date).filter((time) => {
            const hourSplitted = time ? Number(time?.split(":")[0]) : 0;
            const minuteSplitted = time ? Number(time?.split(":")[1]) : 0;

            const booking = dayBookings.find((booking) => {
              const bookingHour = booking.date.getHours();
              const bookingMinutes = booking.date.getMinutes();

              return bookingHour === hourSplitted && bookingMinutes === minuteSplitted;
            });

            if (!booking) return true;

            return false;
          })
        : [],
    [date, dayBookings]
  );

  const validateBookingData = () => {
    if (!hour || !date || !data?.user) {
      console.error("ERROR: handleBookingSubmit values not found");
      return false;
    }
    return true;
  };

  const formatBookingDate = (date: Date, hour: string): Date =>
    setMinutes(setHours(date, hourSplitted), minuteSplitted);

  const saveBookingAndNotify = async (newDateFormatted: Date) => {
    await saveBooking({
      barbershopId: barbershop.id,
      serviceId: service.id,
      userId: (data?.user as any).id,
      date: newDateFormatted,
    });
    setSheetIsOpen(false);
    setHour(undefined);
    setDate(undefined);

    toast("Reserva realizada com sucesso!", {
      description: `${format(newDateFormatted, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
        locale: ptBR,
      })}`,
      action: {
        label: "Visualizar",
        onClick: () => push("/bookings"),
      },
    });
  };

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    try {
      if (!validateBookingData()) return;

      const newDateFormatted = formatBookingDate(date!, hour!);

      await saveBookingAndNotify(newDateFormatted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SheetContent className="p-0 max-h-[100vh] overflow-auto pb-4">
      <SheetHeader className="text-left px-5 py-6 border-solid border-secondary">
        <SheetTitle>Fazer reserva</SheetTitle>
      </SheetHeader>

      <div className="py-1">
        <CalendarComponent {...{ date, setDate, newDate, handleDateClick }} />
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

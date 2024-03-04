import { Badge } from "@/app/_components/ui/badge";
import { Booking } from "@prisma/client";
import { isFuture } from "date-fns";

interface BookingHeaderProps {
  booking: Booking;
}

const BookingHeader = ({ booking }: BookingHeaderProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  return (
    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
      {isBookingConfirmed ? "Confirmado" : "Finalizado"}
    </Badge>
  );
};

export default BookingHeader;

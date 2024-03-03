import { Badge } from "../ui/badge";

interface BookingHeaderProps {
  isBookingConfirmed: boolean;
}

const BookingHeader = ({ isBookingConfirmed }: BookingHeaderProps) => (
  <header className="flex flex-col gap-2 py-5 flex-[3] pl-5">
    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
      {isBookingConfirmed ? "Confirmado" : "Finalizado"}
    </Badge>
  </header>
);

export default BookingHeader;

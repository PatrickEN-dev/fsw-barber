import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IBookingProps } from "./interfaces";

const BookingBody = ({ booking }: IBookingProps) => (
  <section className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
    <p className="text-sm capitalize">
      {format(booking.date, "MMMM", {
        locale: ptBR,
      })}
    </p>
    <p className="text-2xl">{format(booking.date, "dd")}</p>
    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
  </section>
);

export default BookingBody;

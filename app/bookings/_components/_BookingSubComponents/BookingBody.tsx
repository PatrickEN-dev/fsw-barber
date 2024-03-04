import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IBookingProps } from "../interfaces";

const BookingBody = ({ booking }: IBookingProps) => {
  const { date } = booking;
  return (
    <>
      <p className="text-sm capitalize">{format(date, "MMMM", { locale: ptBR })}</p>
      <p className="text-2xl">{format(date, "dd")}</p>
      <p className="text-sm">{format(date, "hh:mm")}</p>
    </>
  );
};

export default BookingBody;

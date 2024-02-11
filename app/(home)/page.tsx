import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";
import InputSearch from "./_components/InputSearch";
import BookingCard from "../_components/BookingCard";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <InputSearch />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingCard />
      </div>
    </div>
  );
}

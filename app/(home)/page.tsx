import Header from "../_components/Header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import InputSearch from "./_components/InputSearch";
import BookingCard from "../_components/_Booking/BookingCard";
import BarberShopCardList from "./_components/_componentsLists/BarberShopCardList";

export default function Home() {
  const newDateFormatted = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });

  return (
    <main>
      <Header />

      <section className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">{newDateFormatted}</p>
      </section>

      <section className="px-5 mt-6">
        <InputSearch />
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        {/* <BookingCard booking={booking} /> */}
      </section>

      <section className="px-2 pb-3">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

        <ul className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          <BarberShopCardList />
        </ul>
      </section>

      <section className="px-2 pb-3">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Populares</h2>

        <ul className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          <BarberShopCardList />
        </ul>
      </section>
    </main>
  );
}

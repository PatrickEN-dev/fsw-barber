import Header from "../_components/Header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import InputSearch from "./_components/InputSearch";
import BookingCard from "../_components/BookingCard";
import BarberShopCardList from "./_components/_componentsLists/BarberShopCardList";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </section>

      <section className="px-5 mt-6">
        <InputSearch />
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingCard />
      </section>

      <section className="px-2 pb-3">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          <BarberShopCardList />
        </div>
      </section>

      <section className="px-2 pb-3">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Populares</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          <BarberShopCardList />
        </div>
      </section>
    </main>
  );
}

import { Booking } from "@prisma/client";
import BookingCard from "../_components/_Booking/BookingCard";
import Header from "../_components/Header";
import ErrorPage from "../_components/errors/ErrorPage";
import { protectRoute } from "../_utils/protectRoute";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { findConfirmedBookings, findFinishedBookings } from "../_actions/booking";

interface IBookingsPageProps {
  booking: Booking;
}

const BookingsPage = async ({ booking }: IBookingsPageProps) => {
  await protectRoute();
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any).id;

  try {
    const [confirmedBookings, finishedBookings] = await Promise.all([
      findConfirmedBookings(userId),
      findFinishedBookings(userId),
    ]);

    return (
      <>
        <Header />

        <section className="px-5 py-6">
          <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

          {confirmedBookings.length > 0 && (
            <>
              <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">Confirmados</h2>

              <ul className="flex flex-col gap-3">
                {confirmedBookings.map((booking: Booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </ul>
            </>
          )}

          {finishedBookings.length > 0 && (
            <>
              <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

              <ul className="flex flex-col gap-3">
                {finishedBookings.map((booking: Booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </ul>
            </>
          )}
        </section>
      </>
    );
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    return <ErrorPage />;
  }
};

export default BookingsPage;

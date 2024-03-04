import { Booking, Prisma } from "@prisma/client";

export interface IBookingProps {
  booking: Booking;
}

export interface IBookingBarberShopServiceProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

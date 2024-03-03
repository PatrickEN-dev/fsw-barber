"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const findConfirmedBookings = async (userId: string) => {
  try {
    return await db.booking.findMany({
      where: {
        userId,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    });
  } catch (error) {
    console.error("Error while fetching confirmed bookings:", error);
    throw error;
  }
};

export const findFinishedBookings = async (userId: string) => {
  try {
    return await db.booking.findMany({
      where: {
        userId,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    });
  } catch (error) {
    console.error("Error while fetching finished bookings:", error);
    throw error;
  }
};

export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};

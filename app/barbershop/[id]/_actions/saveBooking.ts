"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface ISaveBookingProps {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async ({ barbershopId, serviceId, userId, date }: ISaveBookingProps) => {
  await db.booking.create({
    data: {
      barbershopId,
      serviceId,
      userId,
      date,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};

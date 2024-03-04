"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";

export interface IHomePageProps {
  barbershops: Barbershop[];
  recommendedBarbershops: Barbershop[];
  confirmedBookings: Booking[];
}

export const getHomePageData = async () => {
  try {
    const session = await getServerSession(authOptions);

    const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

    return {
      barbershops,
      recommendedBarbershops,
      confirmedBookings,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      barbershops: [],
      recommendedBarbershops: [],
      confirmedBookings: [],
    };
  }
};

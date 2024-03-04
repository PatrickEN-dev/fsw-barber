"use server";

import { db } from "../_lib/prisma";

export const findAllBarbershops = async (term?: string) => {
  try {
    return term
      ? await db.barbershop.findMany({})
      : await db.barbershop.findMany({
          where: {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
        });
  } catch (error) {
    console.error("Error while fetching barber shops:", error);
    throw error;
  }
};

export const findUniqueBarberShop = async (params: any) => {
  try {
    const barberShopData = await db.barbershop.findUnique({
      where: {
        id: params.id,
      },
      include: {
        Service: true,
      },
    });

    return barberShopData;
  } catch (error) {
    console.error("Error while fetching unique barbershop:", error);
    throw error;
  }
};

const findRecommendedBarbershops = async () => {
  try {
    return await db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    });
  } catch (error) {
    console.error("Error while fetching recommended barbershops:", error);
    throw error;
  }
};

const findConfirmedBookingsForUser = async (userId: string) => {
  try {
    return await db.booking.findMany({
      where: {
        userId,
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
    });
  } catch (error) {
    console.error("Error while fetching confirmed bookings for user:", error);
    throw error;
  }
};

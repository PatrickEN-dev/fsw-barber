import { db } from "../_lib/prisma";

export const findManyBarberShops = async () => await db.barbershop.findMany({});

export const findUniqueBarberShop = async (params: any) =>
  await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

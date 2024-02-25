import { db } from "../_lib/prisma";

export const findManyBarberShops = async () => await db.barbershop.findMany({});

export const findUniqueBarberShop = async (params: any) => {
  const barberShopData = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Service: true,
    },
  });

  return barberShopData;
};

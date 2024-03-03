import { db } from "../_lib/prisma";

export const findManyBarberShops = async () => {
  try {
    return await db.barbershop.findMany({});
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

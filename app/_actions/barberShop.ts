import { db } from "../_lib/prisma";

export const findManyBarberShops = async () => await db.barbershop.findMany({});

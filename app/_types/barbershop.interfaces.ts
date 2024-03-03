import { Barbershop } from "@prisma/client";

export interface IBarberShopCardProps {
  barberShop: Barbershop;
}

export interface IErrorProps {
  error?: Error;
  reset?: () => void;
}

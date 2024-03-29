"use client";

import { Barbershop, Service } from "@prisma/client";
import BarberShopServiceCard from "./ServiceCard";

interface IBarbershopServiceCardListProps {
  barbershopData: Barbershop & {
    Service: Service[];
  };
}

const BarbershopServiceCardList = ({ barbershopData }: IBarbershopServiceCardListProps) => {
  return (
    <ul className="px-5 flex flex-col gap-3 py-6">
      {barbershopData?.Service.map((service: Service) => (
        <BarberShopServiceCard service={service} key={service.id} barbershop={barbershopData} />
      ))}
    </ul>
  );
};

export default BarbershopServiceCardList;

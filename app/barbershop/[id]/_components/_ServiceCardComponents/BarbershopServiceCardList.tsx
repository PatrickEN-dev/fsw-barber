"use client";

import { Barbershop, Service } from "@prisma/client";
import BarberShopServiceCard from "./ServiceCard";
import { Button } from "@/app/_components/ui/button";
import { Session } from "next-auth";

interface IBarbershopServiceCardListProps {
  session: Session;
  barbershopData: Barbershop & {
    Service: Service[];
  };
}

const BarbershopServiceCardList = ({
  session,
  barbershopData,
}: IBarbershopServiceCardListProps) => {
  return (
    <>
      <ul className="px-5 flex flex-col gap-3 py-6">
        {barbershopData?.Service.map((service: Service) => (
          <BarberShopServiceCard
            service={service}
            key={service.id}
            isAuthenticated={!!session?.user}
            barbershop={barbershopData}
          />
        ))}
      </ul>

      <div className="items-center w-full flex justify-center">
        <Button className="w-56" type="button">
          Reservar
        </Button>
      </div>
    </>
  );
};

export default BarbershopServiceCardList;

"use client";

import { Barbershop, Service } from "@prisma/client";
import BarberShopServiceCard from "./ServiceCard";
import { Button } from "@/app/_components/ui/button";
import { Session } from "next-auth";
import verifyToSignIn from "@/app/_utils/verifyAuthentication";
import { useState } from "react";

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
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleVerifyToSignInClick = async () =>
    await verifyToSignIn({ value: !!session?.user, signInValue: "google" });

  const handleBookingCLick = async () => {
    await handleVerifyToSignInClick();
    setSheetIsOpen(true);
  };

  const handleServiceSelect = (selectedService: Service | undefined, currentService: Service) => {
    setSelectedServices((prevSelectedServices) => {
      if (selectedService) {
        return [...prevSelectedServices, selectedService];
      } else {
        return prevSelectedServices.filter((s) => s.id !== currentService.id);
      }
    });
  };

  return (
    <>
      <ul className="px-5 flex flex-col gap-3 py-6">
        {barbershopData?.Service.map((service: Service) => (
          <BarberShopServiceCard
            service={service}
            key={service.id}
            barbershop={barbershopData}
            {...{ sheetIsOpen, setSheetIsOpen, selectedServices }}
            onServiceSelect={handleServiceSelect}
          />
        ))}
      </ul>

      <div className="items-center w-full flex justify-center pb-8 pt-2">
        <Button className="w-56" type="button" onClick={handleBookingCLick}>
          Reservar
        </Button>
      </div>
    </>
  );
};

export default BarbershopServiceCardList;

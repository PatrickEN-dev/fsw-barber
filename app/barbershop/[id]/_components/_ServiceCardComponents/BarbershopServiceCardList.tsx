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

  const handleVerifyToSignInClick = async () =>
    await verifyToSignIn({ value: !!session?.user, signInValue: "google" });

  const handleBookingCLick = async () => {
    await handleVerifyToSignInClick();
    setSheetIsOpen(true);
  };

  return (
    <>
      <ul className="px-5 flex flex-col gap-3 py-6">
        {barbershopData?.Service.map((service: Service) => (
          <BarberShopServiceCard
            service={service}
            key={service.id}
            barbershop={barbershopData}
            {...{ sheetIsOpen, setSheetIsOpen }}
          />
        ))}
      </ul>

      <div className="items-center w-full flex justify-center">
        <Button className="w-56" type="button" onClick={handleBookingCLick}>
          Reservar
        </Button>
      </div>
    </>
  );
};

export default BarbershopServiceCardList;

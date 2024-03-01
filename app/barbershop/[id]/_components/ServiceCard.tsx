"use client";

import SheetTriggerButton from "@/app/_components/SheetTriggerButton";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet } from "@/app/_components/ui/sheet";
import { formatPrice } from "@/app/_utils/formatPrices";
import verifyToSignIn from "@/app/_utils/verifyAuthentication";
import { Service } from "@prisma/client";
import Image from "next/image";
import BookingMenu from "./BookingMenu";
import { useState } from "react";

interface IServiceCardProps {
  service: Service;
  isAuthenticated: boolean;
}

const BarberShopServiceCard = ({ service, isAuthenticated }: IServiceCardProps) => {
  const handleVerifyToSignInClick = async () =>
    await verifyToSignIn({ value: isAuthenticated, signInValue: "google" });

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg object-contain"
              src={service.imageUrl}
              fill
              alt={service.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-primary text-sm font-bold">{formatPrice(Number(service.price))}</p>

              <Sheet>
                <SheetTriggerButton
                  buttonContent="Reservar"
                  onClick={handleVerifyToSignInClick}
                  variant="secondary"
                />
                <BookingMenu service={service} />
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopServiceCard;

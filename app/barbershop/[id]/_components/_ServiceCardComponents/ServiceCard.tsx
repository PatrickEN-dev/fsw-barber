"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet } from "@/app/_components/ui/sheet";
import { formatPrice } from "@/app/_utils/formatPrices";
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import BookingMenu from "../_BookingMenu/BookingMenu";
import { Checkbox } from "@/app/_components/ui/checkbox";

interface IServiceCardProps {
  service: Service;
  barbershop: Barbershop;
  sheetIsOpen: boolean;
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  onServiceSelect: (selectedService: Service | undefined, currentService: Service) => void;
  selectedServices: Service[];
}

const BarberShopServiceCard = ({
  service,
  barbershop,
  sheetIsOpen,
  setSheetIsOpen,
  onServiceSelect,
  selectedServices,
}: IServiceCardProps) => {
  const newDate = new Date();
  const [date, setDate] = useState<Date | undefined>(newDate);
  const [hour, setHour] = useState<string | undefined>("");

  const handleCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      onServiceSelect(service, service);
    } else {
      onServiceSelect(undefined, service);
    }
  };

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
              sizes="100vw"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <section className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">{formatPrice(String(service.price))}</p>

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <Checkbox onCheckedChange={handleCheckboxChange} />
                <BookingMenu
                  services={selectedServices}
                  barbershop={barbershop}
                  hour={hour}
                  setHour={setHour}
                  date={date}
                  setDate={setDate}
                  newDate={newDate}
                  sheetIsOpen={sheetIsOpen}
                  setSheetIsOpen={setSheetIsOpen}
                />
              </Sheet>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopServiceCard;

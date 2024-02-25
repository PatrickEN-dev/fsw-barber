"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IBarberShopInfosProps {
  barberShop: Barbershop;
}

const BarberShopInfos = ({ barberShop }: IBarberShopInfosProps) => {
  const { back } = useRouter();
  return (
    <section>
      <div className="h-[250px] w-full relative">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={back}
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>

        <Button size={"icon"} variant={"outline"} className="z-50 absolute top-4 right-4">
          <MenuIcon />
        </Button>
        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
          fill
          className="object-cover opacity-75"
        />
        <h1>{barberShop.name}</h1>
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barberShop.name}</h1>

        <div className="flex item-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barberShop.address}</p>
        </div>

        <div className="flex item-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 pessoas)</p>
        </div>
      </div>
    </section>
  );
};

export default BarberShopInfos;

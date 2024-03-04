import { findAllBarbershops } from "@/app/_actions/barberShop";
import BarberShopCard from "../BarberShopCard";

const BarberShopCardList = async () => {
  const barberShops = await findAllBarbershops();

  return barberShops.map((barberShop) => (
    <BarberShopCard barberShop={barberShop} key={barberShop.id} />
  ));
};

export default BarberShopCardList;

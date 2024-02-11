import BarberShopCard from "../BarberShopCard";
import { findManyBarberShops } from "../../../_actions/barberShop";

const BarberShopCardList = async () => {
  const barberShops = await findManyBarberShops();

  return barberShops.map((barberShop) => (
    <BarberShopCard barberShop={barberShop} key={barberShop.id} />
  ));
};

export default BarberShopCardList;

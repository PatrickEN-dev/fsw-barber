import { findUniqueBarberShop } from "@/app/_actions/barberShop";
import BarberShopInfos from "./_components/BarberShopInfos";

interface IBarberShopDetailsPageProps {
  params: {
    id: string;
  };
}

const BarberShopDetailsPage = async ({ params }: IBarberShopDetailsPageProps) => {
  if (!params.id) return;

  const barberShop = await findUniqueBarberShop({ id: params.id });

  if (!barberShop)
    return (
      <h1 className="h-full items-center text-center flex justify-center">
        Nenhuma barbearia encontrada
      </h1>
    );

  return <BarberShopInfos barberShop={barberShop} />;
};

export default BarberShopDetailsPage;

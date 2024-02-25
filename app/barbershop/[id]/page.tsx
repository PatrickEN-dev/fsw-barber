import { findUniqueBarberShop } from "@/app/_actions/barberShop";
import BarberShopInfos from "./_components/BarberShopInfos";
import BarberShopServiceCard from "./_components/ServiceCard";

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

  return (
    <div>
      <BarberShopInfos barberShop={barberShop} />

      <div className="px-5 flex flex-col gap-3 py-6">
        {barberShop.Service.map((service) => (
          <BarberShopServiceCard service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;

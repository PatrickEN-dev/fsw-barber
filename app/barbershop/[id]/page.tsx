import { findUniqueBarberShop } from "@/app/_actions/barberShop";
import BarberShopInfos from "./_components/BarberShopInfos";
import BarberShopServiceCard from "./_components/ServiceCard";
import { getServerSession } from "next-auth";

interface IBarberShopDetailsPageProps {
  params: {
    id: string;
  };
}

const BarberShopDetailsPage = async ({ params }: IBarberShopDetailsPageProps) => {
  const session = await getServerSession();
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

      <ul className="px-5 flex flex-col gap-3 py-6">
        {barberShop.Service.map((service) => (
          <BarberShopServiceCard
            service={service}
            key={service.id}
            isAuthenticated={!!session?.user}
          />
        ))}
      </ul>
    </div>
  );
};

export default BarberShopDetailsPage;

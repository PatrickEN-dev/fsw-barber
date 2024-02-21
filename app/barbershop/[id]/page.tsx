import { findUniqueBarberShop } from "@/app/_actions/barberShop";

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
      <h1>{barberShop.name}</h1>
    </div>
  );
};

export default BarberShopDetailsPage;

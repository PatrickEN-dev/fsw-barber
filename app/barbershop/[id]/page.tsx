import { findUniqueBarberShop } from "@/app/_actions/barberShop";
import { useRouter } from "next/router";

interface IBarberShopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarberShopDetailsPage = async ({ params }: IBarberShopDetailsPageProps) => {
  const router = useRouter();
  if (!params.id) {
    router.push("/");

    return null;
  }

  const barberShop = await findUniqueBarberShop(params.id);

  if (!barberShop) return <h1>Nenhuma barbearia encontrada</h1>;

  return (
    <div>
      <h1>{barberShop.name}</h1>
    </div>
  );
};

export default BarberShopDetailsPage;

import { Card, CardContent } from "@/app/_components/ui/card";
import { formatPrice } from "@/app/_utils/formatPrices";
import { Barbershop, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IServiceCardDetails {
  service: Service;
  date: Date | undefined;
  hour: string | undefined;
  barbershop: Barbershop;
}

const ServiceCardDetails = ({ service, date, hour, barbershop }: IServiceCardDetails) => {
  const formattedDate = date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : undefined;

  return (
    <Card>
      <CardContent className="p-3 flex flex-col">
        <section className="flex flex-col mb-2">
          <div className="flex justify-between">
            <h2 className="font-bold">{service.name}</h2>
            <h3 className="font-bold">{formatPrice(String(service.price))}</h3>
          </div>

          {date && (
            <section className="flex justify-between mt-4">
              <h3 className="text-gray-400 text-sm">Data</h3>
              <time className="text-gray-400 text-sm capitalize">{formattedDate}</time>
            </section>
          )}

          {hour && (
            <section className="flex justify-between mt-4">
              <h3 className="text-gray-400 text-sm">Hora</h3>
              <time className="text-gray-400 text-sm capitalize">{hour}</time>
            </section>
          )}

          <section className="flex justify-between mt-4">
            <h3 className="text-gray-400 text-sm">Barbearia</h3>
            <h4 className="text-gray-400 text-sm capitalize">{barbershop.name}</h4>
          </section>
        </section>
      </CardContent>
    </Card>
  );
};

export default ServiceCardDetails;

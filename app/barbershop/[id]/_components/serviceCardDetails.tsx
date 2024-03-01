import { Card, CardContent } from "@/app/_components/ui/card";
import { formatPrice } from "@/app/_utils/formatPrices";
import { Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IServiceCardDetails {
  service: Service;
  date: Date | undefined;
  hour: string | undefined;
}

const ServiceCardDetails = ({ service, date, hour }: IServiceCardDetails) => {
  return (
    <Card>
      <CardContent className="p-3 gap-3 flex flex-col">
        <div className="flex justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <h3 className="font-bold">{formatPrice(Number(service.price))}</h3>

          {date && (
            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">Data</h3>
              <h4 className="text-gray-400 text-sm capitalize">
                {format(date, "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </h4>
            </div>
          )}

          {hour && (
            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">Data</h3>
              <h4 className="text-gray-400 text-sm capitalize">{hour}</h4>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCardDetails;

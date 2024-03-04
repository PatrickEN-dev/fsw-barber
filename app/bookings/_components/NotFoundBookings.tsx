import ErrorMessage from "@/app/_components/errors/ErrorMessage";

const NoBookingsMessage = ({ reset }: IErrorProps) => (
  <section className="px-4">
    <ErrorMessage firstMessage={"Ops! Parece que você ainda não possui nenhum agendamento."} />
    <p className="mt-4 text-center">
      Que tal agendar um corte de cabelo ou barba com um de nossos barbeiros incríveis?
    </p>
    <p className="mt-2 text-center">Explorar os serviços disponíveis:</p>
    <div className="flex justify-center text-center">
      <button type="button" onClick={reset}>
        Encontre um barbeiro
      </button>
    </div>
  </section>
);

export default NoBookingsMessage;

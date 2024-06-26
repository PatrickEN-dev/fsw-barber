"use client";

import ErrorMessage from "../_components/errors/ErrorMessage";
import { IErrorProps } from "../_types/barbershop.interfaces";

export default function Error({ reset }: IErrorProps) {
  return (
    <section className="px-4">
      <ErrorMessage firstMessage={"Ops! O sistema está temporariamente fora do ar."} />
      <p className="mt-4 text-center">
        Pedimos desculpas pelo inconveniente. O desenvolvedor está ciente do problema e já está
        trabalhando duro para resolver isso o mais rápido possível.
      </p>
      <p className="mt-2 text-center">Por favor, tente novamente mais tarde.</p>
      <p className="mt-2 text-center">ou</p>
      <div className="flex justify-center text-center">
        <button type="button" onClick={reset}>
          Tente novamente agora
        </button>
      </div>
    </section>
  );
}

export const formatPrice = (price: number | string): string => {
  const priceNumber = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(priceNumber)) throw new Error("Preço inválido");

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceNumber);
};

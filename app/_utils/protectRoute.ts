import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";

export const protectRoute = async () => {
    // posso utilizar middleware aqui
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");
};

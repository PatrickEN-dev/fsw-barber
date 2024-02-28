export const barbershopDescription =
  "Uma barbearia acolhedora e moderna, oferecendo serviços de corte de cabelo, barba e cuidados masculinos e femininos.";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import AuthProvider from "./_providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW-BarberShop",
  description: barbershopDescription,
};

export default function RootLayout({ children }: IChildrenComponent) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

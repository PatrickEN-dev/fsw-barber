"use client";

import verifyToSignIn from "@/app/_utils/verifyAuthentication";
import { Service, User } from "@prisma/client";
import { Session } from "next-auth";
import { create } from "zustand";

interface IStore {
  sheetIsOpen: boolean;
  setSheetIsOpen: (value: boolean) => void;
}

interface IServiceStore {
  selectedServices: Service[];
  setSelectedServices: (services: Service[]) => void;
}

const useStore = create<IStore>((set) => ({
  sheetIsOpen: false,
  setSheetIsOpen: (value: boolean) => set(() => ({ sheetIsOpen: value })),
}));

const useSelectedServices = create<IServiceStore>((set) => ({
  selectedServices: [],
  setSelectedServices: (services: Service[] | ((prevServices: Service[]) => Service[])) =>
    set((state) => ({
      selectedServices:
        typeof services === "function" ? services(state.selectedServices) : services,
    })),
}));

const useBarbershopServices = () => {
  const { sheetIsOpen, setSheetIsOpen } = useStore();
  const { selectedServices, setSelectedServices } = useSelectedServices();

  const handleVerifyToSignInClick = async (session: Session): Promise<void> => {
    await verifyToSignIn({ value: !!session?.user, signInValue: "google" });
  };

  const openSheetAndVerifyUser = async (session: any) => {
    // await handleVerifyToSignInClick(session?.user);
    setSheetIsOpen(true);
  };

  const handleServiceSelect = (selectedService: Service | undefined, currentService: Service) => {
    if (selectedService) {
      setSelectedServices([...selectedServices, selectedService]);
    } else {
      setSelectedServices(
        selectedServices.filter((service: Service) => service.id !== currentService.id)
      );
    }
  };

  const handleCheckboxChange = (isChecked: boolean, service: Service) => {
    if (isChecked) {
      handleServiceSelect(service, service);
    } else {
      handleServiceSelect(undefined, service);
    }
  };

  return {
    sheetIsOpen,
    setSheetIsOpen,
    selectedServices,
    setSelectedServices,
    handleServiceSelect,
    openSheetAndVerifyUser,
    handleCheckboxChange,
  };
};

export default useBarbershopServices;

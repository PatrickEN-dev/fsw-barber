"use client";

import { useState } from "react";
import { cancelBooking } from "@/app/_actions/booking";

import { toast } from "sonner";
import { IBookingProps } from "../interfaces";
import AlertBookingCancelDialog from "../_Modals/AlertBookingCancelDialog";
import { isFuture } from "date-fns";
import { SheetClose, SheetFooter } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";

const BookingFooter = ({ booking }: IBookingProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <SheetFooter className="flex-row gap-3 mt-6">
      <SheetClose asChild>
        <Button className="w-full" variant="secondary">
          Voltar
        </Button>
      </SheetClose>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={!isBookingConfirmed || isDeleteLoading}
            className="w-full"
            variant="destructive"
          >
            Cancelar Reserva
          </Button>
        </AlertDialogTrigger>
        <AlertBookingCancelDialog {...{ isDeleteLoading, handleCancelClick }} />
      </AlertDialog>
    </SheetFooter>
  );
};

export default BookingFooter;

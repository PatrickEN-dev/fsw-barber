"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cancelBooking } from "@/app/_actions/booking";
import { Booking } from "@prisma/client";
import { SheetClose, SheetFooter } from "../ui/sheet";
import { toast } from "sonner";

interface BookingFooterProps {
  booking: Booking;
}

const BookingFooter = ({ booking }: BookingFooterProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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
            // disabled={!booking.isFuture || isDeleteLoading}
            className="w-full"
            variant="destructive"
          >
            Cancelar Reserva
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              Uma vez cancelada, não será possível reverter essa ação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3">
            <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteLoading}
              className="w-full"
              onClick={handleCancelClick}
            >
              {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SheetFooter>
  );
};

export default BookingFooter;

import { Loader2 } from "lucide-react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

interface IAlertBookingCancelDialogProps {
  isDeleteLoading: boolean;
  handleCancelClick: () => Promise<void>;
}

const AlertBookingCancelDialog = ({
  isDeleteLoading,
  handleCancelClick,
}: IAlertBookingCancelDialogProps) => {
  return (
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
  );
};

export default AlertBookingCancelDialog;

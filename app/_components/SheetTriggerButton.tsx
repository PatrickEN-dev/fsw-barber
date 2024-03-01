import { ReactNode } from "react";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

interface ISheetTriggerButtonProps {
  onClick?: (() => void) | undefined;
  buttonContent?: ReactNode;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | undefined;
}

const SheetTriggerButton = ({ onClick, buttonContent, variant }: ISheetTriggerButtonProps) => {
  return (
    <SheetTrigger asChild>
      <Button variant={variant} onClick={onClick}>
        {buttonContent}
      </Button>
    </SheetTrigger>
  );
};

export default SheetTriggerButton;

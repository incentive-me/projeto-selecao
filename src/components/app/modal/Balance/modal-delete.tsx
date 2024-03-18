"use client";
// IMPORTS
import { useState } from "react";

// SERVICES
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

interface ModalDeleteBalanceProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export default function ModalDeleteBalance({
  isOpen,
  setIsOpen,
}: ModalDeleteBalanceProps) {
  const { deleteBalanceById, balanceForId } = useBalance();
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }
  async function handleDelete() {
    setIsLoading(true);
    const documentId = balanceForId?.documentId ?? "";
    await deleteBalanceById(documentId);
    handleClose();
    setIsLoading(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2">
            <Trash2Icon className="h-6 w-6 text-red-600" /> Excluir pedido ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Se excluir este pedido, esta ação não poderá ser revertida. Tem
            certeza que deseja excluir?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="button"
            className="text-zinc-50 bg-red-600"
            onClick={handleDelete}
          >
            {isLoading ? (
              <LoaderCircleIcon className="h-6 w-6 animate-spin" />
            ) : (
              "Excluir"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

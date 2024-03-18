"use client";

// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// SERVICES
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "lucide-react";
import { BalanceProps } from "@/@types/balance.type";

interface ModalEditBalanceProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "name é obrigatório. *",
  }),
  initialValue: z.string().min(1, {
    message: "Valor inicial é obrigatório. *",
  }),
  description: z.string().min(1, {
    message: "Descrição é obrigatório. *",
  }),
});

export default function ModalEditBalance({
  isOpen,
  setIsOpen,
}: ModalEditBalanceProps) {
  const { editBalance, balanceForId } = useBalance();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleClose() {
    setIsOpen(false);
  }

  async function onSubmit({
    description,
    initialValue,
    name,
  }: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const initialValueFormat = parseFloat(initialValue.replace(/,/g, "."));

    if (balanceForId) {
      const dataBalance: BalanceProps = {
        ...balanceForId,
        remainingValue: balanceForId?.remainingValue ?? "",
        description,
        initialValue: parseFloat(initialValueFormat.toFixed(2)),
        name,
      };

      const documentId = balanceForId?.documentId ?? "";
      await editBalance(dataBalance, documentId);
    }
    setIsLoading(false);
    reset();
    handleClose();
  }

  useEffect(() => {
    if (balanceForId) {
      setValue("name", balanceForId?.name);
      setValue("description", balanceForId?.description);
      setValue("initialValue", balanceForId?.initialValue.toString());
    }
  }, [balanceForId]);

  useEffect(() => {
    if (watch("initialValue")) {
      setValue("initialValue", watch("initialValue").replace(/[^0-9,]/g, ""));
    }
  }, [watch("initialValue")]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar saldo</DialogTitle>
            <DialogDescription>
              Por favor, preencha as informações abaixo para editar saldo{" "}
              <b>{balanceForId?.name}</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("name")}
                type="text"
                placeholder="name do saldo"
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.name?.message}
              </p>
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("initialValue")}
                type="text"
                placeholder="Valor inicial"
                pattern="^\d+,\d{1,3}$|^\d+$"
                disabled
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.initialValue?.message}
              </p>
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("description")}
                type="text"
                placeholder="Coloca um pequena description"
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.description?.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircleIcon className="h-6 w-6 text-zic-50 animate-spin" />
              ) : (
                "Editar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

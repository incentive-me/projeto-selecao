"use client";

// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// SERVICES
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentProps } from "@/@types/payment.type";
import { usePayment } from "@/context/PaymentContext";

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

interface ModalEditPaymentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "name é obrigatório. *",
  }),
  price: z.string().min(1, {
    message: "preço é obrigatório. *",
  }),
  description: z.string().min(1, {
    message: "Descrição é obrigatório. *",
  }),
});

export default function ModalEditPayment({
  isOpen,
  setIsOpen,
}: ModalEditPaymentProps) {
  const { editPayment, paymentForId } = usePayment();
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
    price,
    name,
  }: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const priceFormat = parseFloat(price.replace(/,/g, "."));

    if (paymentForId) {
      const dataPayment: PaymentProps = {
        ...paymentForId,
        description,
        price: parseFloat(priceFormat.toFixed(2)),
        name,
      };

      const documentId = paymentForId?.documentId ?? "";
      await editPayment(dataPayment, documentId);
    }
    setIsLoading(false);
    reset();
    handleClose();
  }

  useEffect(() => {
    if (paymentForId) {
      setValue("name", paymentForId?.name);
      setValue("description", paymentForId?.description);
      setValue("price", paymentForId?.price.toString());
    }
  }, [paymentForId]);

  useEffect(() => {
    if (watch("price")) {
      setValue("price", watch("price").replace(/[^0-9,]/g, ""));
    }
  }, [watch("price")]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar pagamento</DialogTitle>
            <DialogDescription>
              Por favor, preencha as informações abaixo para editar pagamento{" "}
              <b>{paymentForId?.name}</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("name")}
                type="text"
                placeholder="name do pagamento"
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.name?.message}
              </p>
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("price")}
                type="text"
                placeholder="Valor inicial"
                pattern="^\d+,\d{1,3}$|^\d+$"
                disabled
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.price?.message}
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

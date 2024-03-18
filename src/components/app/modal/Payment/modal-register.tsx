"use client";

// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// SERVICES
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserCookie } from "@/services/session";
import { PaymentProps } from "@/@types/payment.type";
import { usePayment } from "@/context/PaymentContext";
import { useBalance } from "@/context/BalanceContext";
import { BalanceProps } from "@/@types/balance.type";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// HELPS
import { formatToBRL } from "@/utils/format";
import Link from "next/link";

interface ModalRegisterPaymentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "name é obrigatório. *",
  }),
  price: z.string().min(1, {
    message: "Valor inicial é obrigatório. *",
  }),
  description: z.string().min(1, {
    message: "Descrição é obrigatório. *",
  }),
  documentId: z.string().min(1, {
    message: "Valor do saldo é obrigatório. *",
  }),
});

export default function ModalRegisterPayment({
  isOpen,
  setIsOpen,
}: ModalRegisterPaymentProps) {
  const { createPayment } = usePayment();
  const { balances, editBalance } = useBalance();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userCookie = getUserCookie();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    control,
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
    documentId,
  }: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const priceFormat = parseFloat(price.replace(/,/g, "."));

    const balanceFind = balances.find(
      (balance) => balance.documentId === documentId
    );

    if (balanceFind && balanceFind.remainingValue >= priceFormat) {
      const balance: BalanceProps = {
        ...balanceFind,
        remainingValue: balanceFind.remainingValue - priceFormat,
        usedValue: priceFormat,
      };

      const payment: PaymentProps = {
        description,
        price: parseFloat(priceFormat.toFixed(2)),
        name,
        userId: userCookie?.uid ?? "",
        idBalance: balanceFind.documentId,
      };

      await editBalance(balance, documentId);
      await createPayment(payment);

      reset();
      handleClose();
    } else {
      toast({
        variant: "destructive",
        title: "Aviso: saldo insuficiente.",
        description:
          "Não foi possivel relizar o pagemnto. O saldo nao e suficiente.",
      });
    }
    setIsLoading(false);
  }

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
            <DialogTitle>Criar pagamento</DialogTitle>
            <DialogDescription>
              Por favor, preencha as informações abaixo para registrar um novo
              pagamento.
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
                placeholder="Preço"
                pattern="^\d+,\d{1,3}$|^\d+$"
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
            {balances.length !== 0 ? (
              <FormField
                control={control}
                name="documentId"
                render={({ field }) => (
                  <div className="relative flex flex-col gap-2">
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o saldo a utilizar" />
                        </SelectTrigger>
                        <SelectContent>
                          {balances.map((balance, index) => (
                            <SelectItem
                              key={index}
                              value={balance?.documentId ?? ""}
                            >
                              {balance.name} -{" "}
                              {formatToBRL(balance.remainingValue)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                    <p className="text-sm font-medium text-red-600">
                      {errors?.documentId?.message}
                    </p>
                  </div>
                )}
              />
            ) : (
              <p className="text-sm font-medium">
                No momento não tem saldo cadastro.{" "}
                <Link href="/balance" className=" text-blue-600 underline">
                  Cadastra aqui
                </Link>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircleIcon className="h-6 w-6 text-zic-50 animate-spin" />
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

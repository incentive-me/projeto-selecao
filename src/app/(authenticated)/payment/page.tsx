"use client";

// IMPORTS
import { useEffect, useState } from "react";

// SERVICES
import { usePayment } from "@/context/PaymentContext";
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableData } from "@/components/app/table/table";
import ModalRegisterPayment from "@/components/app/modal/Payment/modal-register";
import ModalEditPayment from "@/components/app/modal/Payment/modal-edit";
import ModalDeletePayment from "@/components/app/modal/Payment/modal-delete";
import { CardData } from "@/components/app/card/cardData";

export default function Payment() {
  const {
    getPaymentByUserId,
    isLoading,
    payments,
    isOpenEdit,
    setIsOpenEdit,
    isOpenDelete,
    setIsOpenDelete,
  } = usePayment();

  const { getBalanceByUserId } = useBalance();
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  useEffect(() => {
    getPaymentByUserId();
  }, []);

  if (payments.length === 0) {
    return (
      <>
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderCircleIcon className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="h-full flex flex-col gap-4 justify-center items-center">
            <ModalRegisterPayment
              isOpen={isOpenRegister}
              setIsOpen={setIsOpenRegister}
            />
            <p className="text-base font-normal">
              Você não possui pagamentos no momento.
            </p>
            <Button
              type="button"
              className="rounded-full bg-blue-500"
              onClick={() => setIsOpenRegister(true)}
            >
              Criar pagamento
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <main className="p-8 flex flex-col gap-6 w-full">
      <ModalRegisterPayment
        isOpen={isOpenRegister}
        setIsOpen={setIsOpenRegister}
      />
      <ModalEditPayment isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />

      <ModalDeletePayment isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Pagamentos</h1>
        <Button
          type="button"
          className="rounded-lg bg-blue-500"
          onClick={() => setIsOpenRegister(true)}
        >
          Criar
        </Button>
      </div>

      <TableData items={payments} type="payment" />
      <CardData items={payments} type="payment" />
    </main>
  );
}

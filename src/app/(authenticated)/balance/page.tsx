"use client";

// IMPORTS
import { useState } from "react";

// SERVICES
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableData } from "@/components/app/table/table";
import { CardData } from "@/components/app/card/cardData";
import ModalRegisterBalance from "@/components/app/modal/Balance/modal-register";
import ModalEditBalance from "@/components/app/modal/Balance/modal-edit";
import ModalDeleteBalance from "@/components/app/modal/Balance/modal-delete";

export default function Balance() {
  const {
    isLoading,
    balances,
    isOpenEdit,
    setIsOpenEdit,
    isOpenDelete,
    setIsOpenDelete,
  } = useBalance();

  const [isOpenRegister, setIsOpenRegister] = useState(false);

  if (balances.length === 0) {
    return (
      <>
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderCircleIcon className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="h-full flex flex-col gap-4 justify-center items-center">
            <ModalRegisterBalance
              isOpen={isOpenRegister}
              setIsOpen={setIsOpenRegister}
            />
            <p className="text-base font-normal">
              Você não possui saldos no momento.
            </p>
            <Button
              type="button"
              className="rounded-full bg-blue-500"
              onClick={() => setIsOpenRegister(true)}
            >
              Criar saldos
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <main className="p-8 flex flex-col gap-6 w-full">
      <ModalRegisterBalance
        isOpen={isOpenRegister}
        setIsOpen={setIsOpenRegister}
      />
      <ModalEditBalance isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />

      <ModalDeleteBalance isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Saldos</h1>
        <Button
          type="button"
          className="rounded-lg bg-blue-500"
          onClick={() => setIsOpenRegister(true)}
        >
          Criar
        </Button>
      </div>

      <TableData items={balances} type="balance" />
      <CardData items={balances} type="balance" />
    </main>
  );
}

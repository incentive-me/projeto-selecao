"use client";

// IMPORTS
import { useState } from "react";

// SERVICES
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import { BalanceProps } from "@/@types/balance.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatToBRL } from "@/utils/format";

interface RenderBalanceProps {
  item: BalanceProps;
  key: number;
}
export default function RenderBalance({ item, key }: RenderBalanceProps) {
  const { setIsOpenEdit, setIsOpenDelete, getBalanceById } = useBalance();

  const {
    description,
    initialValue,
    name,
    remainingValue,
    usedValue,
    documentId,
  } = item;

  const [isLoading, setIsLoading] = useState(false);

  async function handleEdit() {
    setIsLoading(true);
    if (documentId) await getBalanceById(documentId);
    setIsOpenEdit(true);
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    if (documentId) await getBalanceById(documentId);
    setIsOpenDelete(true);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {" "}
          <b>Valor inicial: </b> {formatToBRL(initialValue)}
        </p>
        <p className="text-sm">
          {" "}
          <b>Valor utilizado: </b> {formatToBRL(usedValue ? usedValue : 0)}
        </p>
        <p className="text-sm">
          {" "}
          <b>Valor restante: </b> {formatToBRL(remainingValue)}
        </p>
      </CardContent>
      <CardFooter>
        {isLoading ? (
          <LoaderCircleIcon className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <Button type="button" variant="ghost" onClick={handleDelete}>
              <TrashIcon className="h-4 w-4" />
            </Button>

            <Button type="button" variant="ghost" onClick={handleEdit}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

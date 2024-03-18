"use client";

// IMPORTS
import { useState } from "react";

// SERVICES
import { usePayment } from "@/context/PaymentContext";
import { PaymentProps } from "@/@types/payment.type";
import { formatToBRL } from "@/utils/format";

// COMPONENTS
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

interface RenderPaymentProps {
  item: PaymentProps;
  key: number;
}
export default function RenderPayment({ item, key }: RenderPaymentProps) {
  const { setIsOpenEdit, setIsOpenDelete, getPaymentById } = usePayment();

  const { description, name, price, documentId } = item;

  const [isLoading, setIsLoading] = useState(false);

  async function handleEdit() {
    setIsLoading(true);
    if (documentId) await getPaymentById(documentId);
    setIsOpenEdit(true);
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    if (documentId) await getPaymentById(documentId);
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
          <b>Preço: </b> {formatToBRL(price)}
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

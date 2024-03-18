"use client";
// IMPORTS
import { useState } from "react";

// COMPONENTS
import { LoaderCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// SERVICES
import { usePayment } from "@/context/PaymentContext";
import { PaymentProps } from "@/@types/payment.type";

// HELPS
import { formatToBRL, truncateString } from "@/utils/format";

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
    <TableRow key={key}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="w-[200px]">
        {truncateString(description, 30)}
      </TableCell>
      <TableCell>{formatToBRL(price)}</TableCell>
      <TableCell className="flex gap-2 ">
        {isLoading ? (
          <LoaderCircleIcon className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <Button type="button" variant="link" onClick={handleDelete}>
              <TrashIcon className="h-6 w-6" />
            </Button>

            <Button type="button" variant="link" onClick={handleEdit}>
              <PencilIcon className="h-6 w-6" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

"use client";
// IMPORTS
import { useState } from "react";

// COMPONENTS
import { LoaderCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// SERVICES
import { useBalance } from "@/context/BalanceContext";
import { BalanceProps } from "@/@types/balance.type";

// HELPS
import { formatToBRL, truncateString } from "@/utils/format";

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
    <TableRow key={key}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="w-[200px]">
        {truncateString(description, 30)}
      </TableCell>
      <TableCell>{formatToBRL(initialValue)}</TableCell>
      <TableCell>{formatToBRL(usedValue ? usedValue : 0)}</TableCell>
      <TableCell>{formatToBRL(remainingValue)}</TableCell>
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

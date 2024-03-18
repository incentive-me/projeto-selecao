"use client";

// IMPORTS
import { useState } from "react";

// SERVICES
import { BalanceProps } from "@/@types/balance.type";
import { PaymentProps } from "@/@types/payment.type";

// COMPONENTS
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RenderBalance from "./reanderBalance";
import RenderPayment from "./reanderPayment";

interface CardDataProps {
  items: any[];
  type: "payment" | "balance";
}

export function CardData({ items, type }: CardDataProps) {
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const loadMoreItems = () => {
    setVisibleItemsCount((prevCount) => prevCount + 5);
  };

  const visibleItems = items.slice(0, visibleItemsCount);

  return (
    <div className="w-full flex flex-col gap-2 md:hidden ">
      {visibleItems.map((item) => (
        <>
          {type === "payment" && (
            <RenderPayment item={item as PaymentProps} key={item.documentId} />
          )}
          {type === "balance" && (
            <RenderBalance item={item as BalanceProps} key={item.documentId} />
          )}
        </>
      ))}
      {visibleItemsCount < items.length && (
        <Button type="button" onClick={loadMoreItems}>
          Carregar +
        </Button>
      )}
    </div>
  );
}

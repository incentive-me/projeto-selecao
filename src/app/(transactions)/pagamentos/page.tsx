"use client";

import TablePaymentComponent from "@/components/TransactionsPaymentComponents/Index";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const id = localStorage.getItem("id");

      if (!id) {
        router.push("/auth");
      }
    }
  }, []);

  return (
    <>
      <TablePaymentComponent />
    </>
  );
};

export default page;

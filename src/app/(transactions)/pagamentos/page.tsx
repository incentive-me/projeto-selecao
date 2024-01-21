"use client";

import TablePaymentComponent from "@/components/TransactionsPaymentComponents/Index";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const id = localStorage.getItem("id");
  const router = useRouter();
  useEffect(() => {
    if (!id) {
      router.push("/auth");
    }
  }, []);

  return (
    <>
      <TablePaymentComponent />
    </>
  );
};

export default page;

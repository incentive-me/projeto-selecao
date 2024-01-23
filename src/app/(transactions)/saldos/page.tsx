"use client";

import TableBalanceComponent from "@/components/TransactionsComponents/Index";
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
      <TableBalanceComponent />
    </>
  );
};

export default page;

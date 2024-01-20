"use client";

import TableComponent from "@/components/TransactionsComponents/Index";
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
      <TableComponent />
    </>
  );
};

export default page;

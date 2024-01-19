import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import HeaderTransactionComponent from "./HeaderTransactionComponent";
import TableTransactionComponent from "./TableTransactionComponent";
import { getBalancesPerPerson } from "@/services/BalanceFetch";
import { useRouter } from "next/navigation";
import { BalanceValues } from "@/@types/BalanceType";

const TableComponent = () => {
  const [balances, setBalances] = useState<BalanceValues[]>([]);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      if (id && token) {
        getBalancesPerPerson(id, token).then((response) => {
          console.log(response);
          setBalances(response);
        });
      } else {
        router.push("/auth");
      }
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <div style={{ marginLeft: "180px" }}>
      <CssBaseline />
      <HeaderTransactionComponent title="Saldos" />
      <Container sx={{ marginTop: 4 }}>
        {balances && <TableTransactionComponent rows={balances} />}
        {/* <TableTransactionComponent rows={rows} /> */}
      </Container>
    </div>
  );
};

export default TableComponent;

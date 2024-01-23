import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import HeaderPaymentComponent from "./HeaderPaymentComponent";
import { getPaymentPerPerson } from "@/services/PaymentFetch";
import { useRouter } from "next/navigation";
import { paymentValues } from "@/@types/PaymentType";
import TableTransactionPaymentComponent from "./TableTransactionComponent";

const TablePaymentComponent = () => {
  const [payments, setPayments] = useState<paymentValues[]>([]);

  const [atualizeTable, setAtualizeTable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== undefined) {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          getPaymentPerPerson().then((response) => {
            setPayments(response);
            setAtualizeTable(true);
          });
        } else {
          router.push("/auth");
        }
      } catch (error) {
        throw error;
      }
    }
  }, [atualizeTable]);

  return (
    <div style={{ marginLeft: "180px" }}>
      <CssBaseline />
      <HeaderPaymentComponent
        title="Pagamentos"
        setAtualizeTable={setAtualizeTable}
        atualizeTable={atualizeTable}
      />
      <Container sx={{ marginTop: 4 }}>
        {payments && <TableTransactionPaymentComponent rows={payments} />}
      </Container>
    </div>
  );
};

export default TablePaymentComponent;

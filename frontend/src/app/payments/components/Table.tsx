"use client";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { PaymentValues } from "@/types/all";
import { deletePaymentById } from "@/services/paymentService";
import { Edit } from "@mui/icons-material";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

const Table = ({ rows }: { rows: PaymentValues[] }) => {
  return (
    <main>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={paymentColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </main>
  );
};

const paymentColumns: GridColDef[] = [
  { field: "nome", headerName: "Nome", width: 150 },
  { field: "descricao", headerName: "Descrição", width: 250 },
  {
    field: "valor_inicial",
    headerName: "Valor",
    type: "number",
    width: 160,
  },
  {
    field: "actions",
    headerName: "Ações",
    type: "number",
    width: 140,
    valueGetter: (params: GridValueGetterParams) => params.row.id,
    renderCell: (params) => (
      <>
        <Link href="/payments/update">
          <Edit />
        </Link>

        <DeleteModal
          name="payment_modal"
          onClick={() => {
            deletePaymentById(params.row.id);
          }}
        />
      </>
    ),
  },
];

export default Table;

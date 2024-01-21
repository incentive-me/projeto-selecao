"use client";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { paymentValues } from "@/@types/PaymentType";
import { paymentColumns } from "./ColumnsTableComponent";

const TableTransactionPaymentComponent = ({
  rows,
}: {
  rows: paymentValues[];
}) => {
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

export default TableTransactionPaymentComponent;

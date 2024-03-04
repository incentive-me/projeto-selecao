"use client";
import React from "react";
import { Box } from "@mui/material";
import { columns } from "./ColumnsTableComponent";
import { DataGrid } from "@mui/x-data-grid";
import { BalanceValues } from "@/@types/BalanceType";

const TableTransactionComponent = ({ rows }: { rows: BalanceValues[] }) => {
  return (
    <main>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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

export default TableTransactionComponent;

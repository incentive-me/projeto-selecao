import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome do Saldo", width: 200 },
  { field: "descricao", headerName: "Descrição do Saldo", width: 300 },
  {
    field: "valor_inicial",
    headerName: "Valor Inicial",
    type: "number",
    width: 120,
  },
  {
    field: "valor_utilizado",
    headerName: "Valor Utilizado",
    type: "number",
    width: 120,
  },
  {
    field: "valor_restante",
    headerName: "Valor Restante",
    type: "number",
    width: 120,
  },
  //   {
  //     field: "usuario_id",
  //     headerName: "ID do Usuário",
  //     type: "number",
  //     width: 120,
  //   },
];

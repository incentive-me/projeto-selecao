import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import ButtonComponentModal from "../ButtonComponentModal/ButtonComponentModal";
import DeleteBalanceModal from "../ModalContent/DeleteBalanceModal/Index";

export const columns: GridColDef[] = [
  { field: "nome", headerName: "Nome do Saldo", width: 150 },
  { field: "descricao", headerName: "Descrição do Saldo", width: 250 },
  {
    field: "valor_inicial",
    headerName: "Valor Inicial",
    type: "number",
    width: 160,
  },
  {
    field: "valor_utilizado",
    headerName: "Valor Utilizado",
    type: "number",
    width: 160,
  },
  {
    field: "valor_restante",
    headerName: "Valor Restante",
    type: "number",
    width: 160,
  },
  {
    field: "actions",
    headerName: "Açoes",
    type: "number",
    width: 140,
    valueGetter: (params: GridValueGetterParams) => params.row.id,
    renderCell: (params) => (
      <>
        <ButtonComponentModal name={<EditIcon />} variantColor="text">
          <div>teste</div>
        </ButtonComponentModal>
        <ButtonComponentModal name={<DeleteIcon />} variantColor="text">
          <DeleteBalanceModal balanceId={params.row.id} />
        </ButtonComponentModal>
      </>
    ),
  },
];

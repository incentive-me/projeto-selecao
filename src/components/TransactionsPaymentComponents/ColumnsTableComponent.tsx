import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import ButtonComponentModal from "../ButtonComponentModal/ButtonComponentModal";
import DeleteBalanceModal from "../ModalContent/DeleteBalanceModal/Index";
import BalanceUpdateComponent from "../ModalContent/UpdateBalanceModal/Index";
import { updateBalanceById } from "@/services/BalanceFetch";
import { balanceValuesDefault } from "@/@types/BalanceType";

export const paymentColumns: GridColDef[] = [
  { field: "nome", headerName: "Nome do Pagamento", width: 150 },
  { field: "descricao", headerName: "Descrição do Pagamento", width: 250 },
  {
    field: "valor",
    headerName: "Valor Utilizado",
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
        {/* <ButtonComponentModal name={<EditIcon />} variantColor="text">
          <BalanceUpdateComponent
            onSubmit={(data: balanceValuesDefault) => {
              let { nome, descricao, valor_inicial } = data;
              if (!nome && !descricao && !valor_inicial) return;

              nome ? nome : (nome = params.row.nome);
              valor_inicial
                ? valor_inicial
                : (valor_inicial = params.row.valor_inicial);
              descricao ? descricao : (descricao = params.row.descricao);
              console.log(valor_inicial, nome, descricao);
              updateBalanceById(params.row.id, valor_inicial, nome, descricao);
            }}
          />
        </ButtonComponentModal>
        <ButtonComponentModal name={<DeleteIcon />} variantColor="text">
          <DeleteBalanceModal balanceId={params.row.id} />
        </ButtonComponentModal> */}
        <>teste</>
      </>
    ),
  },
];

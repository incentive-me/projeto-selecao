import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  deleteBalanceByBalanceId,
  updateBalanceById,
} from "@/services/BalanceFetch";
import { BalanceValues } from "@/@types/BalanceType";
import DeleteFunctionModal from "../DeleteButtonModal/Index";
import { HideRow } from "@/utils/hiderow";
import UpdateFunctionModal from "../UpdateButtonModal/Index";

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
    valueGetter: (params: GridValueGetterParams) => {
      (params.row.valor_inicial = parseInt(params.row.valor_inicial)),
        (params.row.valor_utilizado = parseInt(params.row.valor_utilizado)),
        (params.row.valor_restante = parseInt(params.row.valor_restante));
    },
    renderCell: (params) => (
      <>
        <UpdateFunctionModal
          onSubmit={(data: BalanceValues) => {
            let { nome, descricao, valor_inicial } = data;
            if (!nome && !descricao && !valor_inicial) return;

            nome ? nome : (nome = params.row.nome);
            valor_inicial
              ? valor_inicial
              : (valor_inicial = params.row.valor_inicial);
            descricao ? descricao : (descricao = params.row.descricao);

            updateBalanceById(params.row.id, valor_inicial, nome, descricao);
            location.reload();
          }}
        />

        {params.row.valor_restante == 0 && (
          <DeleteFunctionModal
            balanceId={params.row.id}
            name="saldo"
            onClick={() => {
              try {
                HideRow(params.row.id);
                deleteBalanceByBalanceId(params.row.id);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        )}
      </>
    ),
  },
];

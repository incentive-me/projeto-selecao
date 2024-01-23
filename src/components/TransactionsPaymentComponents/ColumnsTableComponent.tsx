import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteFunctionModal from "../DeleteButtonModal/Index";
import {
  deletePaymentByBalanceId,
  updatePaymentById,
} from "@/services/PaymentFetch";
import { HideRow } from "@/utils/hiderow";
import UpdateFunctionModal from "../UpdateButtonModal/Index";
import { paymentValuesDefault } from "@/@types/PaymentType";

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
        </ButtonComponentModal> */}

        <UpdateFunctionModal
          onSubmit={(data: paymentValuesDefault) => {
            let { nome, descricao, valor_inicial } = data;
            if (!nome && !descricao && !valor_inicial) return;
            console.log(data);
            nome ? nome : (nome = params.row.nome);
            valor_inicial
              ? valor_inicial
              : (valor_inicial = params.row.valor_inicial);
            descricao ? descricao : (descricao = params.row.descricao);
            updatePaymentById(
              params.row.id,
              data.nome,
              data.descricao,
              data.valor_inicial
            );
            location.reload();
          }}
        />

        <DeleteFunctionModal
          balanceId={params.row.id}
          name="pagamento"
          onClick={() => {
            HideRow(params.row.id);

            deletePaymentByBalanceId(params.row.id);
          }}
        />
      </>
    ),
  },
];

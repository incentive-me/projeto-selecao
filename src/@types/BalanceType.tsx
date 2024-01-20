export type balanceValuesDefault = {
  nome: string;
  descricao: string;
  valor_inicial: number;
};

export type BalanceValues = {
  id: number;
  valor_utilizado: number;
  valor_restante: number;
  usuario_id: number;
} & balanceValuesDefault;


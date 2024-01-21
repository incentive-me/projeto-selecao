export type paymentValuesDefault = {
  nome: string;
  descricao: string;
  valor: number;
  saldo_id: string;
};

export type paymentValues = {
  id: number;
  usuario_id: number;
} & paymentValuesDefault;

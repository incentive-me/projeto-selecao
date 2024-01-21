export type paymentValuesDefault = {
    nome: string;
    descricao: string;
    valor: number;
  };
  
  export type paymentValues = {
    id: number;
    saldo_id:number ;
  	usuario_id:number 
  } & paymentValuesDefault;
  
  
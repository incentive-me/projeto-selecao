import { ErrorMessage } from "../pages/balance/NewBalance"

export function errorPaymentMessage(err: string): ErrorMessage {
    const message = {
        field: "",
        message: ""
    }
        if(err === "Name must have at least 3 characters"){
            message.field = "name"
            message.message = "O nome precisa ter no mínimo 3 caracteres"
        }

        if(err === "balanceAccount is required"){
            message.field = "balance"
            message.message = "Selecione o saldo a utilizar"
        }

        if(err === "amount is required"){
            message.field = "amount"
            message.message = "O valor do pedido é obrigatório"
        }

        if(err === "Insufficient funds"){
            message.field = "amount"
            message.message = "O valor do pedido é maior que o saldo"
        }
        
        return message
}
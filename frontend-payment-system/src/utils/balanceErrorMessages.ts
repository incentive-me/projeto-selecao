import { ErrorMessage } from "../pages/balance/NewBalance"

export function errorBalanceMessage(err: string): ErrorMessage {
    const message = {
        field: "",
        message: ""
    }
        if(err === "Balance Name is required"){
            message.field = "name"
            message.message = "O campo nome é obrigatório"
        }

        if(err === "Balance Amount is required"){
            message.field = "amount"
            message.message = "O campo valor é obrigatório"
        }

        if(err === "The balance name is not valid"){
            message.field = "name"
            message.message = "O campo nome precisar ter no mínimo 3 letras"
        }
        
        return message
}
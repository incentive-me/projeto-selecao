import { ErrorMessage } from "../pages/balance/NewBalance"

export function errorRegisterMessage(err: string): ErrorMessage {
    const message = {
        field: "",
        message: ""
    }
        if(err === "Name is required"){
            message.field = "name"
            message.message = "O nome é obrigatório"
        }

        if(err === "Email is required"){
            message.field = "email"
            message.message = "O email é obrigatório"
        }

        if(err === "Email is not valid"){
            message.field = "email"
            message.message = "O email não é válido"
        }

        if(err.match(/Duplicate entry/)){
            message.field = "email"
            message.message = "O email já foi cadastradado"
        }

        if(err === "Password is required"){
            message.field = "password"
            message.message = "A senha é obrigatório"
        }
        
        return message
}
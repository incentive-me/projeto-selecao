import { RegisterDataState } from "../pages/auth/Register";
import { ErrorMessage } from "../pages/balance/NewBalance";

export function verifyPassword(resgisterData: RegisterDataState): ErrorMessage {
    const message = {
        field: "",
        message: ""
    }

    if(resgisterData.name !== "" && resgisterData.email !== "" && !resgisterData.password){
        message.field = "password"
        message.message = "A senha é obrigatória"
    }

    if(resgisterData.name !== "" && resgisterData.email !== "" && resgisterData.password.length < 4){
        message.field = "password"
        message.message = "A senha precisa ter no mínimo 4 caracteres"
    }
    return message
}
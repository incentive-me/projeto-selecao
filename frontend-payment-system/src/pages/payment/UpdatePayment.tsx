import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { inputStyle } from "../../styles/global.style";
import { httpClient } from "../../utils/http";
import { updatePaymentName } from "../../redux/payment.slice";

export default function UpdatePayment(){
    const dispatch = useDispatch()
    const { state } = useLocation()
    const [ newName, setNewName ] = useState(state.name)
   console.log(state)
    const handleUpdatePaymentName = () => {
        httpClient("payment", "PATCH", {state, newName})
            .then((res) => dispatch(updatePaymentName(res.data)))
    }

    return(
        <Box component="section">
            <Title title="Editar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        value={newName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewName(e.target.value)}
                    />
                    <TextField 
                        disabled={true} 
                        label="Descrição" 
                        sx={inputStyle}
                        value={state.description}
                    />
                    <TextField 
                        disabled={true} 
                        label="Valor" 
                        sx={inputStyle}
                        value={state.amount}
                    />
                    <SelectBalance />
                </Box>
                <FormButtons 
                    path="/pagamentos"
                    textButton="salvar"
                    onClick={handleUpdatePaymentName} 
                />
            </FormContainer>
        </Box>
    )
}
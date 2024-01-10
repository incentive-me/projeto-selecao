import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";
import { inputStyle } from "../../styles/global.style";
import React, { useState } from "react";
import { httpClient } from "../../utils/http";
import { useDispatch } from "react-redux";
import { createPayment } from "../../redux/payment.slice";
import { decreaseBalance } from "../../redux/balance.slice";
import { useNavigate } from "react-router-dom";

export default function NewPayment(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [balanceAccount, setBalanceAccount] = useState("")
    const [newPayment, setNewPayment] = useState({
        name: "",
        description: "",
        amount: ""
    })
    const decreaseB = { balanceAccount, amount: newPayment.amount}

    const handleCreatePayment = () => {
        httpClient("payment", "POST", {
            payment: {
                name: newPayment.name, 
                description: newPayment.description,
                amount: newPayment.amount,
                balanceAccount: balanceAccount
            } 
        }).then(res => {
            dispatch(createPayment(res.data))
            dispatch(decreaseBalance(decreaseB))
            navigate("/pagamentos")
        })
    }

    return(
        <Box component="section">
            <Title title="Criar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, name: e.target.value})}
                    />
                    <TextField 
                        label="Descrição" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, description: e.target.value})}
                    />
                    <TextField 
                        label="Valor" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, amount: e.target.value})}
                    />
                    <SelectBalance setBalance={setBalanceAccount} />
                </Box>
                <FormButtons 
                    path="/pagamentos" 
                    textButton="criar"
                    onClick={handleCreatePayment}
                />
            </FormContainer>
        </Box>
    )
}
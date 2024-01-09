import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";
import { inputStyle } from "../../styles/global.style";

export default function NewPayment(){
    return(
        <Box component="section">
            <Title title="Criar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                    />
                    <TextField 
                        label="Descrição" 
                        sx={inputStyle}
                    />
                    <TextField 
                        label="Valor" 
                        sx={inputStyle}
                    />
                    <SelectBalance />
                </Box>
                <FormButtons />
            </FormContainer>
        </Box>
    )
}
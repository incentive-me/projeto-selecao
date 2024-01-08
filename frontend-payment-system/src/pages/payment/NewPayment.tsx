import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";

export default function NewPayment(){
    return(
        <Box component="section">
            <Title title="Criar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField label="Nome" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <TextField label="Descrição" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <TextField label="Valor" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <SelectBalance />
                </Box>
                <FormButtons />
            </FormContainer>
        </Box>
    )
}
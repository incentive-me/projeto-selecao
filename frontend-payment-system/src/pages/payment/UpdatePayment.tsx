import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";

export default function UpdatePayment(){
    return(
        <Box component="section">
            <Title title="Editar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField label="Nome" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <TextField disabled={true} label="Descrição" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <TextField disabled={true} label="Valor" sx={{width: '100%', paddingBottom: "16px" }}/>
                    <SelectBalance />
                </Box>
                <FormButtons />
            </FormContainer>
        </Box>
    )
}
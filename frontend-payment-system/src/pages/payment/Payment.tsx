import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import PaymentTable from "../../components/PaymentTable";
import TitleWithButton from "../../components/TitleWithButton";

export default function Payment(){
    const data = false 

    if(data) {
        return(
            <Box component="section">
                <Title title="Pagamentos" />
                <EmptyTable 
                    text="Você não possui pedidos abertos" 
                    buttonText="Criar Pedido"
                    path="/entrar"
                />
            </Box>
        )
    } else {
        return (
        <>
            <TitleWithButton path="/pagamentos/criar" title="Pagamentos" />
            <PaymentTable />
        </>)
    }
}
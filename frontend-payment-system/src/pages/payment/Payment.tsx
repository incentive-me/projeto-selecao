import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import PaymentTable from "../../components/PaymentTable";
import TitleWithButton from "../../components/TitleWithButton";
import { useGetPayments } from "../../hooks/useGetPayments";

export default function Payment(){
    const data = useGetPayments()

    if(!data) {
        return(
            <Box component="section">
                <Title title="Pagamentos" />
                <EmptyTable 
                    text="Você não possui pedidos abertos" 
                    buttonText="Criar Pedido"
                    path="/pagamentos/criar"
                />
            </Box>
        )
    }
        return (
            <Box component="section">
                <TitleWithButton path="/pagamentos/criar" title="Pagamentos" />
                <PaymentTable payment={data} />
            </Box>
        )
}
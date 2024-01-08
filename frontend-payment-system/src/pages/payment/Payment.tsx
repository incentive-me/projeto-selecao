import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import PaymentTable from "../../components/PaymentTable";

export default function Payment(){
    const data = true 

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
        return <PaymentTable />
    }
}
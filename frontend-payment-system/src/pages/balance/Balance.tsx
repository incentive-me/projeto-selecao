import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import PaymentTable from "../../components/PaymentTable";
import TitleWithButton from "../../components/TitleWithButton";
import BalanceTable from "../../components/BalanceTable";

export default function Balance(){
    const data = false 

    if(data) {
        return(
            <Box component="section">
                <Title title="Saldos" />
                <EmptyTable 
                    text="Você não possui saldos" 
                    buttonText="Criar Saldo"
                    path="saldos/criar"
                />
            </Box>
        )
    } else {
        return (
        <>
            <TitleWithButton path="/saldos/criar" title="Saldos" />
            <BalanceTable />
        </>)
    }
}
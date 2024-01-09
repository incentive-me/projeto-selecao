import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import TitleWithButton from "../../components/TitleWithButton";
import BalanceTable from "../../components/BalanceTable";
import { useGetBalance } from "../../hooks/useGetBalance";

export default function Balance(){
    const data = useGetBalance() 

    if(!data) {
        return(
            <Box component="section">
                <Title title="Saldos" />
                <EmptyTable 
                    text="Você não possui saldos" 
                    buttonText="Criar Saldo"
                    path="/saldos/criar"
                />
            </Box>
        )
    } 
        return (
            <Box component="section">
                <TitleWithButton path="/saldos/criar" title="Saldos" />
                <BalanceTable rows={data} />
            </Box>
        )
}
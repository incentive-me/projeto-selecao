import { Box } from "@mui/material";
import Title from "../../components/Title";
import EmptyTable from "../../components/EmptyTable";
import TitleWithButton from "../../components/TitleWithButton";
import BalanceTable from "../../components/BalanceTable";
import { useGetBalance } from "../../hooks/useGetBalance";
import Notification from "../../components/Notification";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Balance(){
    const data = useGetBalance()
    const { state } = useLocation()
    const [openNotification, setOpenNotification ] = useState(state?.open)

    if(data.length === 0) {
        return(
            <Box component="section" style={{display: "flex"}}>
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
            <>
            <Box component="section">
                <TitleWithButton path="/saldos/criar" title="Saldos" />
                <BalanceTable rows={data} />
            </Box>
            <Notification 
                open={openNotification} 
                setOpen={setOpenNotification}
                message={state?.message} 
                type={state?.type}
            />
            </>
        )
}
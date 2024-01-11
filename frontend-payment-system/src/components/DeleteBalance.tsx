import { Box, Button, Typography } from "@mui/material";
import React, { SetStateAction } from "react";
import { InitialDelState, initialDeleteState } from "./BalanceTable";
import { DeleteSharp } from "@mui/icons-material";
import { httpClient } from "../utils/http";
import { useDispatch } from "react-redux";
import { deleteBalanceState } from "../redux/balance.slice";
import { NotificationMessage } from "./DeletePayment";


export default function DeleteBalance({deleteBalance, setDeleteBalance, setMessage}: DeleteProps){
    const dispatch = useDispatch()
    const open: string = deleteBalance.openModal ? "flex" : "none"
    const height = window.innerHeight
    const width = window.innerWidth

    const handleDelete = () => {
        httpClient(`balance/${deleteBalance.balance.id}`, "DELETE", {})
            .then(res => {
                if(res.data.delete) {
                    dispatch(deleteBalanceState(deleteBalance.balance))
                    setDeleteBalance(initialDeleteState)
                    setMessage({ message: "Saldo excluído com sucesso", open: true, type: "success"})}})
            .catch(() => {
                setDeleteBalance(initialDeleteState)
                setMessage({ 
                    message: "Saldo não excluído: o saldo contém pagamentos vinculados", 
                    open: true, 
                    type: "error"})
            })
    }

    return(
        <Box 
            component="div" 
            id="container"
            sx={[style.container, {display: open, width: width, height: height}]}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const { target } = e
                if (target instanceof HTMLElement) {
                    if(target.id === "container"){
                        setDeleteBalance(initialDeleteState)}
                    }
                }
            }
        >
            <Box sx={style.deleteBox} id="box">
                <Box sx={style.titleBox}>
                    <DeleteSharp color="error" sx={style.icon} />
                    <Typography  sx={style.title}>Excluir saldo?</Typography>
                </Box>
                <Typography style={style.text}>
                    Se excluir este pedido, esta ação não poderá ser revertida. Tem certeza que deseja excluir?
                </Typography>
                <Box sx={style.buttons}>
                    <Button 
                        variant="outlined" 
                        onClick={() => setDeleteBalance(initialDeleteState)}
                    >
                        cancelar
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        excluir
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

const style = {
    container: {
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
        backgroundColor: "#00000099",
        left: "0",
        top: "0"
    },
    deleteBox: {
        maxWidth: "734px",
        minHeight: "206px",
        paddingTop: "30px",
        paddingBottom: "30px",
        paddingLeft: "37px",
        paddingRight: "37px",
        borderRadius: "16px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    titleBox: {
        display: "flex",
        alignItems: "center"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between"
    },
    text: {
        fontSize: "16px"
    },
    title: {
        fontSize: "24px",
        paddingLeft: "24px"
    },
    icon: {
        fontSize: "32px"
    }
}

export type DeleteProps = {
    deleteBalance: InitialDelState, 
    setDeleteBalance: React.Dispatch<SetStateAction<InitialDelState>>
    setMessage: React.Dispatch<SetStateAction<NotificationMessage>>,
}
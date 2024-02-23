import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { DeleteSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/http";
import { deleteBalanceState } from "../../redux/balance.slice";

export default function DeleteBalance(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const height = window.innerHeight
    const width = window.innerWidth

    const handleDelete = () => {
        httpClient(`balance/${state.id}`, "DELETE", {})
            .then(res => {
                if(res.data.delete) {
                    dispatch(deleteBalanceState(state))
                    navigate("/saldos", {
                        state: {
                            message: "Saldo excluído com sucesso",
                            open: true
                        }
                    })}})
            .catch(err => console.log(err))
    }

    return(
        <Box 
            component="div" 
            id="container"
            sx={[style.container, {display: "flex", width: width, height: height}]}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const { target } = e
                if (target instanceof HTMLElement) {
                    if(target.id === "container"){
                        navigate("/saldos")}
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
                        onClick={() => navigate("/saldos")}
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
import { Box, Button, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

type EmptyTable = {
    text: string,
    buttonText: string,
    path: string
}

export default function EmptyTable({text, buttonText, path}: EmptyTable){
    return(
        <Box component="div" style={style.container}>
            <Box sx={style.body}>
                <Typography style={style.text}>{text}</Typography>
                <Button 
                    variant="contained" 
                    sx={style.button}
                    onClick={() => <Navigate to={path} replace={true} />}
                >{buttonText}</Button>
            </Box>  
        </Box>
    )
}

const style = {
    container: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"calc(100vw - 368px)", 
        height:"calc(100vh - 133px)"
    },
    body: {
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
    }, 
    text: {
        fontSize: "16px",
        color: "#000000de",
        marginBottom: "24px"
    },
    button: {
        borderRadius: "24px",
        fontSize: "13px",
        height: "30px",
        width: "140px"
    }
}
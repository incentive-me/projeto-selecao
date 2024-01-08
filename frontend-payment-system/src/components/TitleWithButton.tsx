import { Box, Button, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function TitleWithButton({title, path}:{title: string, path: string}){
    return(
        <Box sx={{display: "flex", justifyContent: "space-between", paddingBottom: "32px"}}>
            <Typography style={{ color: "#000000de", fontSize: "24px" }}>
                {title}
            </Typography>
            <Button 
                variant="contained" 
                onClick={() => <Navigate to={path} replace />}
            >Criar</Button>
        </Box>
    )
}
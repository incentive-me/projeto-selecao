import { Box, Button, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

export default function TitleWithButton({title, path}:{title: string, path: string}){
    return(
        <Box sx={{display: "flex", justifyContent: "space-between", paddingBottom: "32px"}}>
            <Typography style={{ color: "#000000de", fontSize: "24px" }}>
                {title}
            </Typography>
            <Link to={path}>
                <Button variant="contained">Criar</Button>
            </Link>
        </Box>
    )
}
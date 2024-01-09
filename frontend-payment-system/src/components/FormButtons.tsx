import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function FormButtons({path, textButton, onClick}: FormButtonsProps){
    return(
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Link to={path}>
                <Button variant="outlined">Cancelar</Button>
            </Link>
            <Button variant="contained" onClick={onClick}>{textButton}</Button>
        </Box>
    )
}

type FormButtonsProps = {
    path: string, 
    textButton: string,
    onClick:  React.MouseEventHandler<HTMLButtonElement>
}

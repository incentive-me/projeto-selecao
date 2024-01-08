import { Box, Button } from "@mui/material";

export default function FormButtons(){
    return(
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Button variant="outlined">Cancelar</Button>
            <Button variant="contained">Criar</Button>
        </Box>
    )
}
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <Box>
            <Typography>Layout</Typography>
            <Outlet />
        </Box>
    )
}
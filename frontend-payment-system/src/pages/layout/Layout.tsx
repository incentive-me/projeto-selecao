import { Box, Button, IconButton, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { layoutStyle as S } from "../../styles/layout.style";
import { AccountBalanceWalletSharp, LogoutSharp, MonetizationOnSharp } from "@mui/icons-material";

export default function Layout() {
    return(
        <Box component="section">
            <Box sx={S.header.container}>
                <Typography style={S.header.logo}>Payments</Typography>
                <Box sx={S.header.account}>
                    <IconButton aria-label="account" size="large">
                        <PersonIcon style={S.header.icon}  />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={S.body}>
                <Box sx={S.menu.container}>
                    <Box>
                        <Button sx={S.menu.buttonBox}>
                            <MonetizationOnSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Pagamentos</Typography>
                        </Button>
                        <Button sx={[S.menu.buttonBox, {borderBottom: "1px solid #0000001f"}]}>
                            <AccountBalanceWalletSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Saldos</Typography>
                        </Button>
                        <Button sx={[S.menu.buttonBox, {marginTop: "8px"}]}>
                            <LogoutSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Sair da conta</Typography>
                        </Button>
                    </Box>
                </Box>
                <Outlet />
            </Box>
        </Box>
    )
}
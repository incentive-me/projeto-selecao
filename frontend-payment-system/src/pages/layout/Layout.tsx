import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { layoutStyle as S } from "../../styles/layout.style";
import { AccountBalanceWalletSharp, LogoutSharp, MonetizationOnSharp } from "@mui/icons-material";

export default function Layout() {
    const location = useLocation()
    const path = location.pathname.split("/")[1]
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
            <Box sx={S.body} component="div">
                <Box sx={S.menu.container} component="nav">
                    <Link to="/pagamentos" style={{textDecoration: "none"}}>
                        <Button 
                            sx={[
                                S.menu.buttonBox, {
                                    marginTop: "8px", 
                                    backgroundColor: path === "pagamentos" ? "#90caf929" : "none"
                            }]} 
                            component="li"
                        >
                            <MonetizationOnSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Pagamentos</Typography>
                        </Button>
                    </Link>
                    <Link to="saldos" style={{textDecoration: "none"}}>
                        <Button 
                            sx={[
                                S.menu.buttonBox, {
                                    borderBottom: "1px solid #0000001f",
                                    backgroundColor: path === "saldos" ? "#90caf929" : "none"
                            }]} 
                            component="li"
                        >
                            <AccountBalanceWalletSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Saldos</Typography>
                        </Button>
                    </Link>
                        <Button sx={[S.menu.buttonBox, {marginTop: "8px"}]} component="li">
                            <LogoutSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Sair da conta</Typography>
                        </Button>
                </Box>
                <Box component="div" sx={S.pageContent}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { layoutStyle as S } from "../../styles/layout.style";
import { AccountBalanceWalletSharp, LogoutSharp, MonetizationOnSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { fecthUser, initialUserState } from "../../redux/user.slice";
import { useState } from "react";

export default function Layout() {
    const dispatch = useDispatch();
    const location = useLocation()
    const path = location.pathname.split("/")[1]
    const [openMenu, setOpenMenu] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("paymentsToken");
        dispatch(fecthUser(initialUserState.user));
    }

    return(
        <Box component="section">
            <Box sx={S.header.container}>
                <Typography style={S.header.logo}>Payments</Typography>
                <Link to="/usuario">
                <Box sx={S.header.account}>
                    <IconButton aria-label="account" size="large">
                        <PersonIcon style={S.header.icon}  />
                    </IconButton>
                </Box>
                </Link>
            </Box>
            <Box sx={S.body} component="div">
                <Box sx={[S.menu.container, {
                        "@media(max-width: 800px)": {
                            display: openMenu ? "block" : "none" 
                        }}]} 
                    component="nav">
                    <Link to="/pagamentos" style={{textDecoration: "none"}}>
                        <Button 
                            sx={[
                                S.menu.buttonBox, {
                                    marginTop: "8px", 
                                    backgroundColor: path === "pagamentos" ? "#90caf929" : "none"
                            }]} 
                            component="li"
                            onClick={() => setOpenMenu(false)}
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
                            onClick={() => setOpenMenu(false)}
                        >
                            <AccountBalanceWalletSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Saldos</Typography>
                        </Button>
                    </Link>
                        <Button sx={[S.menu.buttonBox, {marginTop: "8px"}]} component="li" onClick={handleLogout}>
                            <LogoutSharp style={S.menu.icon} />
                            <Typography style={{textTransform: "capitalize", color: "#fff"}}>Sair da conta</Typography>
                        </Button>
                        <Button 
                            variant="outlined" 
                            sx={S.buttonMenuBottom}
                            onClick={() => setOpenMenu(false)}
                        >
                            fechar menu
                        </Button>
                </Box>
                <Box component="div" sx={S.pageContent}>
                    <Button 
                        variant="outlined" 
                        sx={S.buttonMenu}
                        onClick={() => setOpenMenu(true)}
                    >
                        Menu
                    </Button>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}
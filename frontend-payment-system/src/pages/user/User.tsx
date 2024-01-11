import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Box, TextField } from "@mui/material"
import Title from "../../components/Title"
import FormContainer from "../../components/FormContainer"
import { inputStyle } from "../../styles/global.style"
import FormButtons from "../../components/FormButtons"
import { fecthUser, initialUserState } from "../../redux/user.slice"

export default function User(){
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const handleLogout = () => {
        localStorage.removeItem("paymentsToken");
        dispatch(fecthUser(initialUserState.user));
    }
    
    return(
        <Box component="section">
            <Title title="Usuário" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        disabled={true}
                        value={user.user.name}
                    />
                    <TextField 
                        label="Email" 
                        sx={inputStyle}
                        disabled={true}
                        value={user.user.email}
                    />
                </Box>
            <FormButtons 
                path="/pagamentos"
                textButton="sair da conta"
                onClick={handleLogout} 
            />
            </FormContainer>
        </Box>
    )
}
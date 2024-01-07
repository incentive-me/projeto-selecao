import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

export default function Login(){
    return(

        <Box 
            component="section" 
            display='flex'
            flexDirection="column"
            alignItems="center"
            paddingTop="100px"
        >
        <Typography paddingBottom="20px" variant="h4" component="h2">Payment System</Typography>
        <Typography paddingBottom="20px" variant="h2" component="h4">Login</Typography>
        <TextField
            label="Email"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '35ch' }}
            InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
        />
        <TextField
            label="Senha"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '35ch' }}
            InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
        />
        <Button 
        sx={{ m: 1, width: '40ch' }}
        variant="contained" 
        disabled={false}>Login</Button>
    </Box>
    )
}
import { Box, TextField, Typography, Button } from "@mui/material";

const EditBalance = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, marginBottom: "1rem" }}>
          Editar saldo
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
        component="forms"
      >
        <TextField
          id="name"
          label="Nome"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          disabled
          defaultValue={100}
          id="value"
          label="Valor"
          type="number"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            right: "0",
            left: "250px",
            bottom: "0",
            marginInline: "1rem",
            marginBlock: "1.5rem",
          }}
        >
          <Button variant="outlined" component="a" href="/saldos">
            Cancelar
          </Button>
          <Button variant="contained">Criar</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBalance;

import { Box, TextField, Typography, Button } from "@mui/material";

const CreatePayment = () => {
  const mockBalances = [
    {
      value: 100,
      label: "Saldo 1",
    },
    {
      value: 200,
      label: "Saldo 2",
    },
    {
      value: 300,
      label: "Saldo 3",
    },
  ];

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
          Criar pedido de pagamento
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
          id="description"
          label="Descrição"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          id="value"
          label="Valor"
          type="number"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "1rem" }}
        />

        <TextField
          id="balances"
          select
          label="Selecione o saldo a utilizar"
          sx={{ width: "100%" }}
        >
          {mockBalances.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
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
          <Button variant="outlined" component="a" href="/pagamentos">
            Cancelar
          </Button>
          <Button variant="contained">Criar</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePayment;

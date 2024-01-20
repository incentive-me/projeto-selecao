import { Box, Button, Typography } from "@mui/material";

const PaymentEmpty = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Pagamentos</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            transform: "translateY(-100%)",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Você não possui pedidos abertos.
          </Typography>
          <Button variant="contained" sx={{ borderRadius: "20px", width: 160 }}>
            Criar pedido
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PaymentEmpty;

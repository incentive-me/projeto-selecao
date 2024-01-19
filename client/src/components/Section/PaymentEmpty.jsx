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
      <div className="flex flex-row justify-center items-center min-h-screen h-full">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            transform: "translateY(-50%)",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Você não possui pedidos abertos.
          </Typography>
          <Button variant="contained" sx={{ borderRadius: "20px", width: 160 }}>
            Criar pedido
          </Button>
        </Box>
      </div>
    </>
  );
};

export default PaymentEmpty;

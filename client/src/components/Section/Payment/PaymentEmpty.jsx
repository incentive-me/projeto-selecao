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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "100vh",
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
            Você não possui pagamentos abertos.
          </Typography>
          <Button
            component="a"
            href="/pagamentos/criar"
            variant="contained"
            sx={{ borderRadius: "20px", width: 160 }}
          >
            Criar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PaymentEmpty;

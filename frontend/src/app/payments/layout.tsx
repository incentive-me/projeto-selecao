import type { Metadata } from "next";
import Header from "@/components/Header/Index";
import Sidebar from "@/components/SideBar/Index";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const metadata: Metadata = {
  title: "Plataforma de transações",
  description: "Sistema de transações",
};

type LayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Sidebar />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: "64px",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default RootLayout;

"use client";
import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginFormComponent";
import RegisterForm from "./RegisterFormComponent";

const FormComponent = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");

    const isTokenValid = !!tokenFromLocalStorage;
    isTokenValid ? router.push("/saldos") : router.push("/auth");
  }, [router]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        marginTop="50px"
      >
        {isLoginForm ? (
          <>
            <Typography variant="h4">Conectar</Typography>
            <LoginForm />
          </>
        ) : (
          <>
            <Typography variant="h4">Registrar</Typography>
            <RegisterForm />
          </>
        )}

        <Button
          onClick={() => setIsLoginForm(!isLoginForm)}
          style={{ marginTop: "20px" }}
        >
          {isLoginForm
            ? "Não tem conta? Registre-se"
            : "Já tem conta? Conecte-se"}
        </Button>
      </Box>
    </Container>
  );
};

export default FormComponent;

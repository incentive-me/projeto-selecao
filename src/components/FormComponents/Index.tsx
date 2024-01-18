"use client";
import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import LoginForm from "./LoginFormComponent";
import RegisterForm from "./RegisterFormComponent";

const FormComponent = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSwitch = () => {
    setIsLoginForm(!isLoginForm);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleFormSubmit = () => {
    console.log("Form Data:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

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
            <LoginForm
              onSubmit={handleFormSubmit}
              onChange={handleInputChange}
              values={formData}
            />
          </>
        ) : (
          <>
            <Typography variant="h4">Registrar</Typography>
            <RegisterForm
              onSubmit={handleFormSubmit}
              onChange={handleInputChange}
              values={formData}
            />
          </>
        )}

        <Button onClick={handleFormSwitch} style={{ marginTop: "20px" }}>
          {isLoginForm
            ? "Não tem conta? Registre-se"
            : "Já tem conta? Conecte-se"}
        </Button>
      </Box>
    </Container>
  );
};

export default FormComponent;

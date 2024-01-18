"use client";
import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import LoginForm from "./LoginFormComponent";
import RegisterForm from "./RegisterFormComponent";
import { RegisterUser } from "@/app/services/UserFetch";

const FormComponent = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleFormRegisterSubmit = () => {
    const CreateUser = RegisterUser(formData).then((response) => {
      console.log(response);
      return response;
    });
  };

  const handleForm = () => {
    console.log("te");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
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
              onSubmit={handleForm}
              onChange={handleInputChange}
              values={formData}
            />
          </>
        ) : (
          <>
            <Typography variant="h4">Registrar</Typography>
            <RegisterForm
              onSubmit={handleFormRegisterSubmit}
              onChange={handleInputChange}
              values={formData}
            />
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

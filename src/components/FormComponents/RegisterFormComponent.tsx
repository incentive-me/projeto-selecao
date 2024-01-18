import React from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import { Box } from "@mui/material";
import FormAreaComponents from "./FormAreaComponents";

type RegisterFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    nome?: string;
    email?: string;
    senha?: string;
  };
};

const RegisterForm = ({ onSubmit, onChange, values }: RegisterFormProps) => {
  return (
    <form style={{ width: "100%" }}>
      <FormAreaComponents>
        <InputFormComponent
          label="Name"
          value={values.nome || ""}
          onChange={onChange}
          name="name"
        />

        <InputFormComponent
          label="Email"
          value={values.email || ""}
          onChange={onChange}
          name="email"
        />

        <InputFormComponent
          label="Senha"
          value={values.senha || ""}
          onChange={onChange}
          name="senha"
        />

        <ButtonFormComponent onSubmit={onSubmit} value="Register" />
      </FormAreaComponents>
    </form>
  );
};

export default RegisterForm;

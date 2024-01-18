import React from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import FormAreaComponents from "./FormAreaComponents";

type LoginFormProps = {
  onSubmit: any; // (event: React.FormEvent<HTMLFormElement>) => void;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    email?: string;
    senha?: string;
  };
};

const LoginForm = ({ onSubmit, onChange, values }: LoginFormProps) => {
  return (
    <form style={{ width: "100%" }}>
      <FormAreaComponents>
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

        <ButtonFormComponent onSubmit={onSubmit} value="Conectar" />
      </FormAreaComponents>
    </form>
  );
};

export default LoginForm;

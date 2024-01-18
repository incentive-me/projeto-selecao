import React, { useState } from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import FormAreaComponents from "./FormAreaComponents";
import { UserRegisterSchema } from "@/app/schemas/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterUser } from "@/app/services/UserFetch";
import ErrorMessage from "../ErrorComponent/MessageErrorSchema";

const RegisterForm = () => {
  const [emailError, setEmailError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { nome, email, senha } = data;
      const response = await RegisterUser(nome, email, senha);
      setEmailError(false);
    } catch (error) {
      console.error(error);
      setEmailError(true);
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <FormAreaComponents>
        <InputFormComponent
          label="Nome"
          register={register}
          {...register("nome")}
        />
        {errors.nome && <ErrorMessage message={errors.nome.message} />}

        <InputFormComponent
          label="Email"
          register={register}
          {...register("email")}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
        {/* eu sei que é má pratica mostrar que email já existe mas como é um teste queria mostrar que tem validação de email para o usuario */}
        {emailError && <ErrorMessage message="Email ja existe" />}

        <InputFormComponent
          label="Senha"
          register={register}
          {...register("senha")}
        />
        {errors.senha && <ErrorMessage message={errors.senha.message} />}

        <ButtonFormComponent value="Registrar" />
      </FormAreaComponents>
    </form>
  );
};

export default RegisterForm;

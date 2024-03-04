import React, { useState } from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import FormAreaComponents from "./FormAreaComponents";

import { UserRegisterSchema } from "@/schemas/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterUser } from "@/services/UserFetch";
import ErrorMessage from "../ErrorComponent/MessageErrorSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    const { nome, email, senha } = data;
    try {
      setLoading(true);
      const response = await RegisterUser(nome, email, senha);

      setEmailError(false);
    } catch (error) {
      setEmailError(true);
      throw new Error("Registro inválido");
    } finally {
      reset({ nome: "", email: "", senha: "" });
      setLoading(false);
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

        <ButtonFormComponent value="Registrar" disabled={loading} />
        {loading && <p>Carregando...</p>}
      </FormAreaComponents>
    </form>
  );
};

export default RegisterForm;

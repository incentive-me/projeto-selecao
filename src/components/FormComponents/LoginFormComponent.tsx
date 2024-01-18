import React, { useState } from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import FormAreaComponents from "./FormAreaComponents";
import { UserLoginSchema } from "@/app/schemas/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInUser } from "@/app/services/UserFetch";
import ErrorMessage from "../ErrorComponent/MessageErrorSchema";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserLoginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email, senha } = data;
      const response = await signInUser(email, senha);
    } catch (error) {
      console.log(error);
    } finally {
      reset({ email: "", senha: "" });
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <FormAreaComponents>
        <InputFormComponent
          label="Email"
          register={register}
          {...register("email")}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

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

export default LoginForm;

import React, { useState } from "react";
import InputFormComponent from "./InputComponent";
import ButtonFormComponent from "./ButtonComponent";
import FormAreaComponents from "./FormAreaComponents";
import { UserLoginSchema } from "@/schemas/UserSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInUser } from "@/services/UserFetch";
import ErrorMessage from "../ErrorComponent/MessageErrorSchema";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      const token = response?.token;
      const id = response?.usuario?.id;
      document.cookie = `token=${token}; path=/; secure; SameSite=Strict`;
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      setLoading(true);
      router.push("/saldos");
    } catch (error) {
      throw new Error("Login inválido");
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

        <ButtonFormComponent value="Conectar" disabled={loading} />
        {loading && <p>Carregando...</p>}
      </FormAreaComponents>
    </form>
  );
};

export default LoginForm;

import { incentiveMeApi } from "./apis";

export const RegisterUser = async (
  nome: string,
  email: string,
  senha: string
) => {
  try {
    const { data } = await incentiveMeApi.post("/user/", {
      nome,
      email,
      senha,
    });
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

export const signInUser = async (email: string, senha: string) => {
  try {
    const { data } = await incentiveMeApi.post("/login/", {
      email,
      senha,
    });
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

export const signOut = async () => {
  try {
    const { data } = await incentiveMeApi.post("/logout/");
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro!!");
  }
};

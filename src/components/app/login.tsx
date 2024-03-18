"use client";

// IMPORTS
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import * as z from "zod";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { removeUserCookie, setUserCookie } from "@/services/session";

// COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { usePayment } from "@/context/PaymentContext";
import { useBalance } from "@/context/BalanceContext";

const FormSchema = z.object({
  email: z.string().min(1, { message: "E-mail é obrigatório. *" }).email({
    message: "E-mail inválido. *",
  }),
  password: z.string().min(1, { message: "Senha é obrigatório. *" }),
});

export default function LayoutLogin() {
  const { handleResetStatePayment } = usePayment();
  const { handleResetStateBalance } = useBalance();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const [passwordView, setPasswordView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      handleResetStatePayment();
      handleResetStateBalance();

      // @ts-ignore
      const { uid, accessToken } = userCredential.user;

      removeUserCookie();
      setUserCookie({ accessToken, uid });
      setIsLoading(false);

      push("balance");
      toast({
        title: "Sucesso: login realizado.",
        description: "Seja bem-vindo à nossa plataforma.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Aviso: nao foi possível entrar.",
        description: "E-mail ou senha estão incorretos.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen justify-center items-center "
    >
      <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl font-medium">Olá de novo!!</CardTitle>
          <CardDescription className="text-lg font-medium">
            Bem vindo de volta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-2">
              <Input {...register("email")} placeholder="E-mail" />
              <p className="text-sm font-medium text-red-600">
                {errors?.email?.message}
              </p>
            </div>

            <div className="relative flex flex-col gap-2">
              <Input
                type={!passwordView ? "password" : "text"}
                placeholder="Password"
                {...register("password")}
              />
              <Button
                className="absolute inset-y-0 end-0 flex items-center"
                type="button"
                variant="link"
                onClick={() => setPasswordView(!passwordView)}
              >
                {passwordView ? (
                  <EyeIcon className="h-6 w-6 text-secondary-300" />
                ) : (
                  <EyeOffIcon className="h-6 w-6 text-secondary-300" />
                )}
              </Button>
              <p className="text-sm font-medium text-red-600">
                {errors?.password?.message}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="register">
            <Button type="button" variant="link">
              Eu não tenho um conta!
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircleIcon className="h-6 w-6 text-zic-50 animate-spin" />
            ) : (
              "Entrar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

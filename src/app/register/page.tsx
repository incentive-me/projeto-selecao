"use client";

// IMPORTS
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// SERVICES
import * as z from "zod";
import { auth } from "@/services/firebase";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircleIcon } from "lucide-react";

const FormSchema = z
  .object({
    email: z.string().min(1, { message: "E-mail é obrigatório. *" }).email({
      message: "Provide a valid email. *",
    }),

    password: z
      .string()
      .min(6, {
        message: "A senha deve ter pelo menos 6 caracteres. *",
      })
      .max(8, {
        message: "A senha não deve ter mais de 8 caracteres. *",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem. *",
  });

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);

      push("login");
      toast({
        title: "Sucesso: cadastro realizado.",
        description:
          "Seus dados foi registrado sem problemas. Realiza o login.",
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Aviso: nao foi possível registrar.",
        description: "E-mail já está em uso.",
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
          <CardTitle className="text-3xl font-medium">
            Perfeito para você!
          </CardTitle>
          <CardDescription className="text-xl font-medium">
            Vamos criar sua conta?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-2">
              <Input {...register("email")} type="text" placeholder="E-mail" />
              <p className="text-sm font-medium text-red-600">
                {errors?.email?.message}
              </p>
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("password")}
                type="password"
                placeholder="Senha"
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.password?.message}
              </p>
            </div>
            <div className="relative flex flex-col gap-2">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirmação de senha"
              />
              <p className="text-sm font-medium text-red-600">
                {errors?.confirmPassword?.message}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="login">
            <Button type="button" variant="link">
              Eu ja tenho uma conta!
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircleIcon className="h-6 w-6 text-zic-50 animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

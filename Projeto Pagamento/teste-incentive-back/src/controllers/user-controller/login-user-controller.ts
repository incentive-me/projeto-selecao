import { z } from "zod";
import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { LoginUserUseCase } from "../../use-cases/users-use-case/login-user";
import { UserInvalidEmailError } from "../../use-cases/errors/user-invalid-email";

export async function LoginUser(req: Request, res: Response) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  });

  const { email, senha } = loginBodySchema.parse(req.body);

  try {
    const UserRepository = new PrismaUserRepository();
    const loginUserUseCase = new LoginUserUseCase(UserRepository);

    const result = await loginUserUseCase.execute({
      email,
      senha,
    });

    return res
      .status(201)
      .json({
        message: "successful login",
        user: result.user,
        token: result.token,
      });
  } catch (err) {
    if (err instanceof UserInvalidEmailError) {
      return res.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}

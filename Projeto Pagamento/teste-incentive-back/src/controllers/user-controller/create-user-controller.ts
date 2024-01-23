import { z } from "zod";
import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../use-cases/users-use-case/create-user";
import { UserAlreadyExistError } from "../../use-cases/errors/user-already-exists";

export async function CreateUser(req: Request, res: Response) {
  const registerBodySchema = z.object({
    user: z.string(),
    email: z.string().email(),
    password_hash: z.string().min(6),
  });

  const { user, email, password_hash } = registerBodySchema.parse(req.body);

  try {
    const UserRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUserUseCase(UserRepository);

    await createUserUseCase.execute({
      user,
      email,
      password_hash,
    });

    return res.status(201).json({ message: "successful created user" });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return res.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}

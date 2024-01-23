import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "../errors/user-already-exists";

interface CreateUserUseCaseRequest {
  user: string;
  email: string;
  password_hash: string;
}

interface CreateUserUseCaseResponse {
  users: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    user,
    email,
    password_hash,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const senha = await hash(password_hash, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const users = await this.userRepository.create({
      user,
      email,
      senha,
    });

    return {
      users,
    };
  }
}

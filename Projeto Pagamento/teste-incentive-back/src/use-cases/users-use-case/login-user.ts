import { UserRepository } from "../../repositories/user-repository";
import jwt from "jsonwebtoken";
import { UserInvalidEmailError } from "../errors/user-invalid-email";
import { compare } from "bcryptjs";
import { env } from "../../env";

interface LoginUserUseCaseRequest {
  email: string;
  senha: string;
}

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, senha }: LoginUserUseCaseRequest) {
    const userEmail = await this.userRepository.findByEmail(email);

    if (!userEmail) {
      throw new UserInvalidEmailError();
    }

    const comparePassword = await compare(senha, userEmail.senha);

    if (comparePassword == false) {
      throw new UserInvalidEmailError();
    }

    const token = jwt.sign({ id: userEmail.id }, env.JWT_PASS ?? "", {
      expiresIn: "8h",
    });

    return {
      user: userEmail,
      token: token,
    };
  }
}

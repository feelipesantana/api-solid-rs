import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ name, email, password }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exist!");
    }
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

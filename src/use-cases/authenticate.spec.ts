import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("it should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Joe Doe",
      email: "johndoe@exemple.com",
      password_hash: await hash("123456", 6),
    });
    const { user } = await sut.handle({
      email: "johndoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("it should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.handle({
        email: "johndoe@exemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("it should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Joe Doe",
      email: "johndoe@exemple.com",
      password_hash: await hash("123456", 6),
    });
    expect(() =>
      sut.handle({
        email: "johndoe@exemple.com",
        password: "12331233",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  // it('should register a new user', async () => {}
});

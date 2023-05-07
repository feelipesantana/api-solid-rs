import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  it("it should be able to create gym", async () => {
    const { gym } = await sut.handle({
      title: "Gym 2",
      description: "Gym rocketseat",
      phone: "(41)00000-0000",
      latitude: -23.4221399,
      longitude: -46.5736667,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});

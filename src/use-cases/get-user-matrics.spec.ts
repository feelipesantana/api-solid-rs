import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-matrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User metric Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("it should be able to get check ins counts", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.handle({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});

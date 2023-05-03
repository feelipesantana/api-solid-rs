import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckIn Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    gymsRepository.items.push({
      id: "gym-01",
      title: "Academia SP",
      description: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("it should be able to do check in", async () => {
    const { checkIn } = await sut.handle({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.6002411,
      userLongitude: -46.757523,
    });

    console.log(checkIn.created_at);
    expect(checkIn.id).toEqual(expect.any(String));
  });

  // Red, green, refactor

  it("it should not be able to do check ins twice on the same day ", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.handle({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.6002411,
      userLongitude: -46.757523,
    });

    await expect(() =>
      sut.handle({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -23.6002411,
        userLongitude: -46.757523,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("it should be able to do check ins two days different", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.handle({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.6002411,
      userLongitude: -46.757523,
    });
    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.handle({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.6002411,
      userLongitude: -46.757523,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});

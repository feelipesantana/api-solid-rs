import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearByGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;

describe("Fetch Gyms Near Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearByGymsUseCase(gymsRepository);
  });

  it("it should be able to find gym near", async () => {
    await gymsRepository.create({
      title: "near gym",
      description: "Gym rocketseat",
      phone: "(41)00000-0000",
      latitude: -23.6002411,
      longitude: -46.757523,
    });
    await gymsRepository.create({
      title: "javascript gym",
      description: "Gym rocketseat",
      phone: "(41)00000-0000",
      latitude: -23.4221399,
      longitude: -46.5736667,
    });

    const { gyms } = await sut.handle({
      userLatitude: -23.6002411,
      userLongitude: -46.757523,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "near gym" })]);
  });
});

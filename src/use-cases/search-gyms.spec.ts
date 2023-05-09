import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("it should be able to search Gyms", async () => {
    await gymsRepository.create({
      title: "javascript gym",
      description: "Gym rocketseat",
      phone: "(41)00000-0000",
      latitude: -23.4221399,
      longitude: -46.5736667,
    });
    await gymsRepository.create({
      title: "typescript gym",
      description: "Gym rocketseat",
      phone: "(41)00000-0000",
      latitude: -23.4221399,
      longitude: -46.5736667,
    });

    const { gyms } = await sut.handle({
      query: "javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript gym" }),
    ]);
  });

  it("it should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `javascript-gym-${i}`,
        description: "Gym rocketseat",
        phone: "(41)00000-0000",
        latitude: -23.4221399,
        longitude: -46.5736667,
      });
    }

    const { gyms } = await sut.handle({
      query: "javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript-gym-21" }),
      expect.objectContaining({ title: "javascript-gym-22" }),
    ]);
  });
});

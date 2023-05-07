import type { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseProps {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return { gym };
  }
}

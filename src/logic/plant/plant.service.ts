import { Inject, Injectable } from '@nestjs/common';

import { Plant, PlantDTO } from './plant';
import { PlantRepositoryImpl } from 'src/database/plant/plant.repository.impl';

@Injectable()
export class PlantService {
  constructor(
    @Inject('InMemoryPlantRepository')
    private plantRepository: PlantRepositoryImpl,
  ) {}

  async getById(id: number) {
    return this.plantRepository.findById(id);
  }
  async getByName(name: string) {
    return this.plantRepository.findByName(name);
  }
  async getAllByToxicity(toxicity: boolean) {
    return this.plantRepository.findAllByToxicity(toxicity);
  }
  async create(plant: PlantDTO) {
    return this.plantRepository.save(new Plant(plant.name, plant.toxicity));
  }
  async update(id: number, plantDTO: PlantDTO) {
    const plant = await this.plantRepository.findById(id);
    plant.update(plantDTO.name, plantDTO.toxicity);
    return this.plantRepository.save(plant);
  }
  async delete(id: number) {
    return this.plantRepository.delete(id);
  }
}

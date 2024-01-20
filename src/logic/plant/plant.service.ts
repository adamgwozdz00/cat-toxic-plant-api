import { Inject, Injectable } from '@nestjs/common';
import { PlantRepository } from './plan.repository.interface';
import { Plant, PlantDTO } from './plant';

@Injectable()
export class PlantService {
  constructor(
    @Inject('PlantRepository') private plantRepository: PlantRepository,
  ) {}

  async getById(id) {
    return this.plantRepository.findById(id);
  }
  async getByName(name) {
    return this.plantRepository.findByName(name);
  }
  async getAllByToxicity(toxicity) {
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
  async delete(id) {
    return this.plantRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { PlantRepository } from 'src/logic/plant/plan.repository.interface';
import { Plant } from 'src/logic/plant/plant';

@Injectable()
export class PlantRepositoryImpl implements PlantRepository {
  private plants: Plant[] = [];

  async findById(id: number): Promise<Plant> {
    return this.plants.find((plant) => plant.id === id);
  }
  async findByName(name: string): Promise<Plant[]> {
    return this.plants.filter((plant) => plant.name === name);
  }
  async findAllByToxicity(toxicity: boolean): Promise<Plant[]> {
    return this.plants.filter((plant) => plant.toxicity == toxicity);
  }
  async save(plant: Plant): Promise<number> {
    const index = this.plants.findIndex((p) => p.id === plant.id);
    if (index !== -1) {
      this.plants[index] = plant;
      return plant.id;
    }
    plant['id'] = this.plants.length + 1;
    this.plants.push(plant);
    return plant.id;
  }
  async delete(id: number): Promise<void> {
    this.plants = this.plants.filter((plant) => plant.id !== id);
  }
}

export const plantRepositoryProvider = {
  provide: 'InMemoryPlantRepository',
  useClass: PlantRepositoryImpl,
};
